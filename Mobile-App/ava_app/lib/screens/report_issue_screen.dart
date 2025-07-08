import 'dart:io';

import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

import '../database/database_helper.dart';
import '../models/complaint.dart';
import '../widgets/image_picker_widget.dart';

class ReportIssueScreen extends StatefulWidget {
  const ReportIssueScreen({super.key});

  @override
  State<ReportIssueScreen> createState() => _ReportIssueScreenState();
}

class _ReportIssueScreenState extends State<ReportIssueScreen> {
  File? _issueImage;
  final _issueNameController = TextEditingController();
  final _descriptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Report an Issue')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Describe the Problem',
                style: Theme.of(context).textTheme.displayMedium),
            const SizedBox(height: 32),
            TextFormField(
              controller: _issueNameController,
              decoration: const InputDecoration(
                labelText: 'Issue Name',
                hintText: 'e.g., Pest on Mulberry Leaf',
                prefixIcon: Icon(Iconsax.tag),
              ),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _descriptionController,
              decoration: const InputDecoration(
                labelText: 'Description',
                hintText: 'Describe what you see...',
                prefixIcon: Icon(Iconsax.document_text),
              ),
              maxLines: 4,
            ),
            const SizedBox(height: 24),
            ImagePickerWidget(
              label: 'Add a Photo of the Issue',
              onImagePicked: (file) => setState(() => _issueImage = file),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () async {
                // Save complaint to database
                final complaint = Complaint(
                  issueName: _issueNameController.text,
                  description: _descriptionController.text,
                  imagePath: _issueImage?.path,
                );
                await DatabaseHelper.instance.createComplaint(complaint);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                      content: Text('Issue reported successfully!'),
                      backgroundColor: Colors.green),
                );
                Navigator.pop(context, true);
              },
              child: const Text('Report Issue'),
            ),
          ],
        ),
      ),
    );
  }
}
