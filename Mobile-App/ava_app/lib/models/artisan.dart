import 'dart:convert';
import 'dart:io';

class Artisan {
  final int? id;
  final String name;
  final String phone;
  final String village;
  final String district;
  final String state;
  final String professions; // Stored as a comma-separated string
  final String assets; // Stored as a JSON string
  final String? aadharImagePath;
  final String? panImagePath;
  final bool isSynced;

  Artisan({
    this.id,
    required this.name,
    required this.phone,
    required this.village,
    required this.district,
    required this.state,
    required this.professions,
    required this.assets,
    this.aadharImagePath,
    this.panImagePath,
    this.isSynced = false,
  });

  // For saving to local SQLite DB
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'village': village,
      'district': district,
      'state': state,
      'professions': professions,
      'assets': assets,
      'aadhar_image_path': aadharImagePath,
      'pan_image_path': panImagePath,
      'is_synced': isSynced ? 1 : 0,
    };
  }

  // For creating an object from local SQLite DB
  factory Artisan.fromMap(Map<String, dynamic> map) {
    return Artisan(
      id: map['id'],
      name: map['name'],
      phone: map['phone'],
      village: map['village'],
      district: map['district'],
      state: map['state'],
      professions: map['professions'],
      assets: map['assets'],
      aadharImagePath: map['aadhar_image_path'],
      panImagePath: map['pan_image_path'],
      isSynced: map['is_synced'] == 1,
    );
  }

  // For converting to JSON to send to the backend
  Future<Map<String, dynamic>> toJson() async {
    String? aadharBase64;
    String? panBase64;

    if (aadharImagePath != null && aadharImagePath!.isNotEmpty) {
      final imageBytes = await File(aadharImagePath!).readAsBytes();
      aadharBase64 = base64Encode(imageBytes);
    }
    if (panImagePath != null && panImagePath!.isNotEmpty) {
      final imageBytes = await File(panImagePath!).readAsBytes();
      panBase64 = base64Encode(imageBytes);
    }

    // Safely parse assets
    List<Map<String, dynamic>> assetsList = [];
    try {
      if (assets.isNotEmpty) {
        assetsList = List<Map<String, dynamic>>.from(jsonDecode(assets));
      }
    } catch (e) {
      print('Error parsing assets JSON: $e');
      print('Assets string: $assets');
      // If JSON parsing fails, return empty list
      assetsList = [];
    }

    return {
      'name': name,
      'phone': phone,
      'location': {
        'village': village,
        'district': district,
        'state': state,
      },
      'professionIds':
          professions.split(',').where((p) => p.isNotEmpty).toList(),
      'assets': assetsList,
      'kycDetails': {
        'aadhar': {'status': 'PENDING', 'imageUrl': aadharBase64},
        'pan': {'status': 'PENDING', 'imageUrl': panBase64},
      },
      'roles': ['ROLE_ARTISAN'],
    };
  }
}
