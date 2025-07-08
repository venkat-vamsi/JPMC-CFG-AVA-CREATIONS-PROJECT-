import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

import '../database/database_helper.dart';
import '../services/sync_service.dart';
import '../widgets/dashboard_card_ui.dart';
import 'add_artisan_screen.dart';
import 'manage_artisans_screen.dart';
import 'report_issue_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _unsyncedCount = 0;

  @override
  void initState() {
    super.initState();
    _loadUnsyncedCount();
  }

  Future<void> _loadUnsyncedCount() async {
    final count = await DatabaseHelper.instance.getUnsyncedCount();
    setState(() {
      _unsyncedCount = count;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            expandedHeight: 220.0,
            backgroundColor: theme.primaryColor,
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.only(left: 16, bottom: 16),
              title: Text('Leader Dashboard',
                  style: theme.textTheme.titleLarge
                      ?.copyWith(color: Colors.white)),
              background: _buildHeader(context),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Core Tasks', style: theme.textTheme.displaySmall),
                      if (_unsyncedCount > 0)
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.orange,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            '$_unsyncedCount pending',
                            style: const TextStyle(
                                color: Colors.white, fontSize: 12),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  DashboardCardUi(
                    title: 'Add New Artisan',
                    description:
                        'Register a new member and collect their details.',
                    icon: Iconsax.user_add,
                    color: theme.primaryColor,
                    onTap: () async {
                      final result = await Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const AddArtisanScreen()));
                      if (result == true) {
                        _loadUnsyncedCount();
                      }
                    },
                  ),
                  const SizedBox(height: 16),
                  DashboardCardUi(
                    title: 'Report an Issue',
                    description:
                        'Send a photo and description of a problem to advisors.',
                    icon: Iconsax.message_question,
                    color: theme.colorScheme.secondary,
                    onTap: () async {
                      final result = await Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const ReportIssueScreen()));
                      if (result == true) {
                        _loadUnsyncedCount();
                      }
                    },
                  ),
                  const SizedBox(height: 16),
                  DashboardCardUi(
                    title: 'Manage Data',
                    description:
                        'View and manage stored artisans and complaints.',
                    icon: Iconsax.document,
                    color: Colors.teal,
                    onTap: () async {
                      await Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => const ManageArtisansScreen()));
                      _loadUnsyncedCount();
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          // Show loading indicator
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
                content: Text('Syncing data...'),
                backgroundColor: Colors.blue,
                duration: Duration(seconds: 2)),
          );

          try {
            final syncService = SyncService();
            final success = await syncService.syncAllData();

            if (success) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                    content: Text('Data synced successfully!'),
                    backgroundColor: Colors.green),
              );
              _loadUnsyncedCount(); // Refresh the count after successful sync
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                    content: Text('Sync failed. Please try again.'),
                    backgroundColor: Colors.red),
              );
            }
          } catch (e) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                  content: Text('Sync error: ${e.toString()}'),
                  backgroundColor: Colors.red),
            );
          }
        },
        label: Text(
            _unsyncedCount > 0 ? 'Sync Data ($_unsyncedCount)' : 'Sync Data'),
        icon: const Icon(Iconsax.cloud_connection),
        backgroundColor: _unsyncedCount > 0 ? Colors.orange : Colors.blueGrey,
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [theme.primaryColor, theme.primaryColor.withOpacity(0.7)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CircleAvatar(
                radius: 30,
                backgroundColor: Colors.white24,
                child: Icon(Iconsax.user, size: 30, color: Colors.white),
              ),
              const SizedBox(height: 12),
              Text(
                'Welcome!!!',
                style: theme.textTheme.displayMedium
                    ?.copyWith(color: Colors.white),
              ),
              Text(
                'AVA Creations Cluster Leader',
                style:
                    theme.textTheme.bodyLarge?.copyWith(color: Colors.white70),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
