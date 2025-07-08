import 'dart:convert';

import 'package:http/http.dart' as http;

import '../database/database_helper.dart';

class SyncService {
  static const String _usersUrl =
      'http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/users/bulk';
  static const String _complaintsUrl =
      'http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/complaints/bulk';

  final DatabaseHelper _dbHelper = DatabaseHelper.instance;

  Future<bool> syncAllData() async {
    try {
      await _syncArtisans();
      await _syncComplaints();
      return true;
    } catch (e) {
      print('A general sync error occurred: $e');
      return false;
    }
  }

  Future<void> _syncArtisans() async {
    print('Starting artisan sync...');
    final unsyncedArtisans = await _dbHelper.getUnsyncedArtisans();
    print('Unsynced artisans count: \\${unsyncedArtisans.length}');
    if (unsyncedArtisans.isEmpty) {
      print('No unsynced artisans to sync.');
      return;
    }

    List<Map<String, dynamic>> payload = [];
    for (var artisan in unsyncedArtisans) {
      payload.add(await artisan.toJson());
    }

    print('Sending artisan payload: \\${jsonEncode(payload)}');
    try {
      final response = await http.post(
        Uri.parse(_usersUrl),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: jsonEncode(payload),
      );
      print(
          'Artisan sync response: Status: \\${response.statusCode}, Body: \\${response.body}');
      if (response.statusCode == 200 || response.statusCode == 201) {
        print('Successfully synced \\${unsyncedArtisans.length} artisans.');
        final idsToUpdate = unsyncedArtisans.map((a) => a.id!).toList();
        await _dbHelper.markArtisansAsSynced(idsToUpdate);
      } else {
        print(
            'Failed to sync artisans. Status: \\${response.statusCode}, Body: \\${response.body}');
        throw Exception('Failed to sync artisans');
      }
    } catch (e, stack) {
      print('Exception during artisan sync: \\${e.toString()}');
      print(stack);
      rethrow;
    }
  }

  Future<void> _syncComplaints() async {
    print('Starting complaints sync...');
    final unsyncedComplaints = await _dbHelper.getUnsyncedComplaints();
    print('Unsynced complaints count: \\${unsyncedComplaints.length}');
    if (unsyncedComplaints.isEmpty) {
      print('No unsynced complaints to sync.');
      return;
    }

    // Prepare complaints data with base64 encoded images
    List<Map<String, dynamic>> payload = [];
    for (var complaint in unsyncedComplaints) {
      payload.add(await complaint.toJson());
    }

    print('Sending complaints payload: \\${jsonEncode(payload)}');
    try {
      final response = await http.post(
        Uri.parse(_complaintsUrl),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: jsonEncode(payload),
      );
      print(
          'Complaints sync response: Status: \\${response.statusCode}, Body: \\${response.body}');
      if (response.statusCode == 200 || response.statusCode == 201) {
        print('Successfully synced \\${unsyncedComplaints.length} complaints.');
        final idsToUpdate = unsyncedComplaints.map((c) => c.id!).toList();
        await _dbHelper.markComplaintsAsSynced(idsToUpdate);
      } else {
        print(
            'Failed to sync complaints. Status: \\${response.statusCode}, Body: \\${response.body}');
        throw Exception('Failed to sync complaints');
      }
    } catch (e, stack) {
      print('Exception during complaints sync: \\${e.toString()}');
      print(stack);
      rethrow;
    }
  }
}
