import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

import '../models/artisan.dart';
import '../models/complaint.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('ava_leader_app.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future _createDB(Database db, int version) async {
    await db.execute('''
    CREATE TABLE artisans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, phone TEXT, village TEXT, district TEXT, state TEXT,
      professions TEXT, assets TEXT,
      aadhar_image_path TEXT, pan_image_path TEXT,
      is_synced INTEGER NOT NULL DEFAULT 0
    )
    ''');

    await db.execute('''
    CREATE TABLE complaints (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      issueName TEXT NOT NULL, description TEXT NOT NULL,
      image_path TEXT,
      is_synced INTEGER NOT NULL DEFAULT 0
    )
    ''');
  }

  // --- ARTISAN METHODS ---
  Future<void> createArtisan(Artisan artisan) async {
    final db = await instance.database;
    await db.insert('artisans', artisan.toMap());
  }

  Future<List<Artisan>> getUnsyncedArtisans() async {
    final db = await instance.database;
    final maps =
        await db.query('artisans', where: 'is_synced = ?', whereArgs: [0]);
    return maps.isNotEmpty ? maps.map((c) => Artisan.fromMap(c)).toList() : [];
  }

  Future<List<Artisan>> getAllArtisans() async {
    final db = await instance.database;
    final maps = await db.query('artisans', orderBy: 'id DESC');
    return maps.isNotEmpty ? maps.map((c) => Artisan.fromMap(c)).toList() : [];
  }

  Future<void> markArtisansAsSynced(List<int> ids) async {
    final db = await instance.database;
    if (ids.isEmpty) return;

    final placeholders = ids.map((_) => '?').join(',');
    await db.update(
      'artisans',
      {'is_synced': 1},
      where: 'id IN ($placeholders)',
      whereArgs: ids,
    );
  }

  // --- COMPLAINT METHODS ---
  Future<void> createComplaint(Complaint complaint) async {
    final db = await instance.database;
    await db.insert('complaints', complaint.toMap());
  }

  Future<List<Complaint>> getUnsyncedComplaints() async {
    final db = await instance.database;
    final maps =
        await db.query('complaints', where: 'is_synced = ?', whereArgs: [0]);
    return maps.isNotEmpty
        ? maps.map((c) => Complaint.fromMap(c)).toList()
        : [];
  }

  Future<List<Complaint>> getAllComplaints() async {
    final db = await instance.database;
    final maps = await db.query('complaints', orderBy: 'id DESC');
    return maps.isNotEmpty
        ? maps.map((c) => Complaint.fromMap(c)).toList()
        : [];
  }

  Future<void> markComplaintsAsSynced(List<int> ids) async {
    final db = await instance.database;
    if (ids.isEmpty) return;

    final placeholders = ids.map((_) => '?').join(',');
    await db.update(
      'complaints',
      {'is_synced': 1},
      where: 'id IN ($placeholders)',
      whereArgs: ids,
    );
  }

  // --- GENERAL METHODS ---
  Future<int> getUnsyncedCount() async {
    final db = await instance.database;
    final artisansCount = Sqflite.firstIntValue(await db
            .rawQuery('SELECT COUNT(*) FROM artisans WHERE is_synced = 0')) ??
        0;
    final complaintsCount = Sqflite.firstIntValue(await db
            .rawQuery('SELECT COUNT(*) FROM complaints WHERE is_synced = 0')) ??
        0;
    return artisansCount + complaintsCount;
  }
}
