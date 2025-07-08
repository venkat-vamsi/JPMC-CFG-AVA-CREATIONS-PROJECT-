import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

import '../database/database_helper.dart';
import '../models/artisan.dart';
import '../models/complaint.dart';
import 'add_artisan_screen.dart';

class ManageArtisansScreen extends StatefulWidget {
  const ManageArtisansScreen({super.key});

  @override
  State<ManageArtisansScreen> createState() => _ManageArtisansScreenState();
}

class _ManageArtisansScreenState extends State<ManageArtisansScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late Future<List<Artisan>> _artisansFuture;
  late Future<List<Complaint>> _complaintsFuture;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _refreshData();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _refreshData() {
    setState(() {
      _artisansFuture = DatabaseHelper.instance.getAllArtisans();
      _complaintsFuture = DatabaseHelper.instance.getAllComplaints();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Manage Data'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Artisans'),
            Tab(text: 'Complaints'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildArtisansTab(),
          _buildComplaintsTab(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final result = await Navigator.push(context,
              MaterialPageRoute(builder: (_) => const AddArtisanScreen()));
          if (result == true) {
            _refreshData();
          }
        },
        label: const Text('Add New Artisan'),
        icon: const Icon(Iconsax.add),
        backgroundColor: Theme.of(context).colorScheme.secondary,
      ),
    );
  }

  Widget _buildArtisansTab() {
    return FutureBuilder<List<Artisan>>(
      future: _artisansFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text('No artisans added yet.'));
        }
        final artisans = snapshot.data!;
        return ListView.builder(
          padding: const EdgeInsets.all(8),
          itemCount: artisans.length,
          itemBuilder: (context, index) {
            final artisan = artisans[index];
            return Card(
              child: ListTile(
                leading: const CircleAvatar(child: Icon(Iconsax.user)),
                title: Text(artisan.name),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${artisan.village}, ${artisan.district}'),
                    Text('Phone: ${artisan.phone}'),
                    Text('Professions: ${artisan.professions}'),
                  ],
                ),
                isThreeLine: true,
                trailing: Tooltip(
                  message:
                      artisan.isSynced ? 'Synced with server' : 'Pending sync',
                  child: Icon(
                    artisan.isSynced ? Iconsax.tick_circle : Iconsax.cloud_add,
                    color: artisan.isSynced ? Colors.green : Colors.orange,
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildComplaintsTab() {
    return FutureBuilder<List<Complaint>>(
      future: _complaintsFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text('No complaints reported yet.'));
        }
        final complaints = snapshot.data!;
        return ListView.builder(
          padding: const EdgeInsets.all(8),
          itemCount: complaints.length,
          itemBuilder: (context, index) {
            final complaint = complaints[index];
            return Card(
              child: ListTile(
                leading:
                    const CircleAvatar(child: Icon(Iconsax.message_question)),
                title: Text(complaint.issueName),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(complaint.description),
                    if (complaint.imagePath != null)
                      const Text('Has image attachment'),
                  ],
                ),
                isThreeLine: true,
                trailing: Tooltip(
                  message: complaint.isSynced
                      ? 'Synced with server'
                      : 'Pending sync',
                  child: Icon(
                    complaint.isSynced
                        ? Iconsax.tick_circle
                        : Iconsax.cloud_add,
                    color: complaint.isSynced ? Colors.green : Colors.orange,
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }
}
