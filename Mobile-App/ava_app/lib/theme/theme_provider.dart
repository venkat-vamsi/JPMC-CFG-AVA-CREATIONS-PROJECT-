import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ThemeProvider with ChangeNotifier {
  static const Color primaryColor = Color(0xFF2E7D32);
  static const Color accentColor = Color(0xFFE6A23C);
  static const Color backgroundColor = Color(0xFFF5F5DC);
  static const Color surfaceColor = Color(0xFFFFFFFF);
  static const Color textColor = Color(0xFF3E2723);
  static const Color secondaryTextColor = Color(0xFF795548);

  final ThemeData _themeData = ThemeData(
    primaryColor: primaryColor,
    scaffoldBackgroundColor: backgroundColor,
    colorScheme: const ColorScheme.light(
      primary: primaryColor,
      secondary: accentColor,
      background: backgroundColor,
      surface: surfaceColor,
      onPrimary: Colors.white,
      onSecondary: Colors.black,
      onBackground: textColor,
      onSurface: textColor,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: primaryColor,
      elevation: 0,
      iconTheme: const IconThemeData(color: Colors.white),
      titleTextStyle: GoogleFonts.lato(
          color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
    ),
    textTheme: TextTheme(
      displayLarge: GoogleFonts.merriweather(
          fontSize: 34, fontWeight: FontWeight.bold, color: textColor),
      displayMedium: GoogleFonts.merriweather(
          fontSize: 24, fontWeight: FontWeight.bold, color: textColor),
      displaySmall: GoogleFonts.merriweather(
          fontSize: 22, fontWeight: FontWeight.bold, color: textColor),
      bodyLarge: GoogleFonts.lato(fontSize: 16, color: textColor, height: 1.5),
      bodyMedium: GoogleFonts.lato(
          fontSize: 14, color: secondaryTextColor, height: 1.5),
      labelLarge: GoogleFonts.lato(
          fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
    ),
    cardTheme: CardTheme(
      elevation: 2,
      color: surfaceColor,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 0),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: accentColor,
        foregroundColor: Colors.black,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
        textStyle: GoogleFonts.lato(fontSize: 16, fontWeight: FontWeight.bold),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
      hintStyle: GoogleFonts.lato(color: secondaryTextColor.withOpacity(0.7)),
    ),
  );

  ThemeData get themeData => _themeData;
}
