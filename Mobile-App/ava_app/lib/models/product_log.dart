class ProductLog {
  final int? id;
  final int artisanId;
  final String productName;
  final int quantity;
  final DateTime logDate;
  final bool isSynced;

  ProductLog({
    this.id,
    required this.artisanId,
    required this.productName,
    required this.quantity,
    required this.logDate,
    this.isSynced = false,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'artisan_id': artisanId,
      'product_name': productName,
      'quantity': quantity,
      'log_date': logDate.toIso8601String(),
      'is_synced': isSynced ? 1 : 0,
    };
  }
}
