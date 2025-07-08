import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/complaint.dart';

class ComplaintService {
  // The backend URL you provided. We assume it now accepts a JSON body.
  // The endpoint might need to be adjusted if it's different for JSON vs multipart.
  static const String _uploadUrl =
      'http://ec2-18-136-196-238.ap-southeast-1.compute.amazonaws.com:8080/api/complaints';

  Future<bool> submitComplaint(Complaint complaint) async {
    try {
      // The backend expects a JSON object for a single complaint.
      // We convert our Complaint object to JSON using the toJson() method.
      final body = jsonEncode(complaint.toJson());

      print('Sending complaint to $_uploadUrl');
      print('Payload: $body');

      // Send a standard POST request with a JSON body.
      final response = await http.post(
        Uri.parse(_uploadUrl),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: body,
      );

      // Check the response status code
      if (response.statusCode == 200 || response.statusCode == 201) {
        print('Complaint submitted successfully!');
        print('Response: ${response.body}');
        return true;
      } else {
        print(
            'Failed to submit complaint. Status code: ${response.statusCode}');
        print('Error Response: ${response.body}');
        return false;
      }
    } catch (e) {
      print('An error occurred while submitting complaint: $e');
      return false;
    }
  }
}
