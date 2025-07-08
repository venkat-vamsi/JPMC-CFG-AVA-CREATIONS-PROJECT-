import 'dart:convert';
import 'dart:io';

class Complaint {
  final int? id;
  final String issueName;
  final String description;
  final String? imagePath;
  final bool isSynced;

  Complaint({
    this.id,
    required this.issueName,
    required this.description,
    this.imagePath,
    this.isSynced = false,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'issueName': issueName,
      'description': description,
      'image_path': imagePath,
      'is_synced': isSynced ? 1 : 0,
    };
  }

  factory Complaint.fromMap(Map<String, dynamic> map) {
    return Complaint(
      id: map['id'],
      issueName: map['issueName'],
      description: map['description'],
      imagePath: map['image_path'],
      isSynced: map['is_synced'] == 1,
    );
  }

  Future<Map<String, dynamic>> toJson() async {
    String? imageBase64;
    if (imagePath != null && imagePath!.isNotEmpty) {
      final imageBytes = await File(imagePath!).readAsBytes();
      imageBase64 = base64Encode(imageBytes);
    }
    return {
      'complaintTitle': issueName,
      'complaintDescription': description,
      'image': imageBase64,
    };
  }
}
