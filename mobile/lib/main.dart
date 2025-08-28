import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_nfc_kit/flutter_nfc_kit.dart';
import 'package:http/http.dart' as http;

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

  runApp(const NFCScannerApp());
}

class NFCScannerApp extends StatelessWidget {
  const NFCScannerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: NFCScannerPage(),
    );
  }
}

class NFCScannerPage extends StatefulWidget {
  const NFCScannerPage({super.key});

  @override
  State<NFCScannerPage> createState() => _NFCScannerPageState();
}

class _NFCScannerPageState extends State<NFCScannerPage> {
  Color _bgColor = const Color(0xFF863799);

  @override
  void initState() {
    super.initState();
    _startLoop();
  }

  Future<void> _startLoop() async {
    while (mounted) {
      try {
        final tag = await FlutterNfcKit.poll();
        final tagId = tag.id;

        final url = Uri.parse(
          "http://192.168.1.71:5173/api/scan/${Uri.encodeComponent(tagId)}",
        );
        await http.get(url);

        setState(() {
          _bgColor = const Color(0xFF74e872);
        });

        await Future.delayed(const Duration(seconds: 1));

        setState(() {
          _bgColor = const Color(0xFF863799);
        });

        await FlutterNfcKit.finish();
      } on PlatformException catch (e) {
        debugPrint("NFC error: ${e.message}");
        await Future.delayed(const Duration(seconds: 1));
      } catch (e) {
        debugPrint("Unknown error: $e");
        await Future.delayed(const Duration(seconds: 1));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bgColor,
      body: Center(child: Image.asset("assets/logo_badge.png", width: 200)),
    );
  }
}
