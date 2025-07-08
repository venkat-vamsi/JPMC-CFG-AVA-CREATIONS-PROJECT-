import 'dart:convert';
import 'dart:io';

import 'package:another_stepper/another_stepper.dart';
import 'package:flutter/material.dart';
import 'package:iconsax/iconsax.dart';

import '../database/database_helper.dart';
import '../models/artisan.dart';
import '../widgets/image_picker_widget.dart';

class Asset {
  final int id;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController quantityController = TextEditingController();
  final TextEditingController unitController = TextEditingController();
  Asset(this.id);
}

class AddArtisanScreen extends StatefulWidget {
  const AddArtisanScreen({super.key});
  @override
  State<AddArtisanScreen> createState() => _AddArtisanScreenState();
}

class _AddArtisanScreenState extends State<AddArtisanScreen> {
  int _currentStep = 0;
  final List<StepperData> _stepperData = [
    StepperData(
        title: StepperText("Personal"),
        subtitle: StepperText("Name & Location")),
    StepperData(
        title: StepperText("Work"),
        subtitle: StepperText("Professions & Assets")),
    StepperData(
        title: StepperText("Documents"), subtitle: StepperText("KYC Photos")),
  ];

  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _villageController = TextEditingController();
  final _districtController = TextEditingController();
  final _stateController = TextEditingController();

  File? _aadharImage;
  File? _panImage;

  final List<String> _allProfessions = [
    'Handloom',
    'Sericulture',
    'Bamboo',
    'Agroproducts'
  ];
  final Set<String> _selectedProfessions = {};

  final List<Asset> _assets = [Asset(0)];
  int _nextAssetId = 1;

  void _addAsset() => setState(() => _assets.add(Asset(_nextAssetId++)));
  void _removeAsset(int id) =>
      setState(() => _assets.removeWhere((a) => a.id == id));

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register New Artisan'),
        leading: IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Navigator.of(context).pop()),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: AnotherStepper(
              stepperList: _stepperData,
              stepperDirection: Axis.horizontal,
              activeIndex: _currentStep,
              activeBarColor: theme.primaryColor,
              inActiveBarColor: Colors.grey.shade300,
            ),
          ),
          Expanded(
            child: IndexedStack(
              index: _currentStep,
              children: [
                _buildStepContent(_buildPersonalForm()),
                _buildStepContent(_buildWorkForm()),
                _buildStepContent(_buildKycForm()),
              ],
            ),
          ),
          _buildNavigationButtons(),
        ],
      ),
    );
  }

  Widget _buildStepContent(Widget child) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
      child: child,
    );
  }

  Widget _buildPersonalForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Personal Details",
            style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 24),
        TextFormField(
            controller: _nameController,
            decoration: const InputDecoration(
                labelText: 'Full Name', prefixIcon: Icon(Iconsax.user))),
        const SizedBox(height: 16),
        TextFormField(
            controller: _phoneController,
            decoration: const InputDecoration(
                labelText: 'Phone Number', prefixIcon: Icon(Iconsax.call))),
        const SizedBox(height: 24),
        Text("Location", style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 16),
        TextFormField(
            controller: _villageController,
            decoration: const InputDecoration(labelText: 'Village')),
        const SizedBox(height: 16),
        TextFormField(
            controller: _districtController,
            decoration: const InputDecoration(labelText: 'District')),
        const SizedBox(height: 16),
        TextFormField(
            controller: _stateController,
            decoration: const InputDecoration(labelText: 'State')),
      ],
    );
  }

  Widget _buildWorkForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("Professions", style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 16),
        Wrap(
          spacing: 8.0,
          children: _allProfessions
              .map((p) => FilterChip(
                    label: Text(p),
                    selected: _selectedProfessions.contains(p),
                    onSelected: (s) => setState(() => s
                        ? _selectedProfessions.add(p)
                        : _selectedProfessions.remove(p)),
                    selectedColor:
                        Theme.of(context).primaryColor.withOpacity(0.2),
                  ))
              .toList(),
        ),
        const SizedBox(height: 24),
        Text("Assets", style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 16),
        ..._assets.map((a) => _buildAssetFormRow(a)),
        Align(
          alignment: Alignment.centerRight,
          child: TextButton.icon(
              icon: const Icon(Iconsax.add),
              label: const Text('Add Asset'),
              onPressed: _addAsset),
        ),
      ],
    );
  }

  Widget _buildAssetFormRow(Asset asset) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        children: [
          Expanded(
              flex: 3,
              child: TextFormField(
                  controller: asset.nameController,
                  decoration: const InputDecoration(labelText: 'Asset Name'))),
          const SizedBox(width: 8),
          Expanded(
              flex: 2,
              child: TextFormField(
                  controller: asset.quantityController,
                  decoration: const InputDecoration(labelText: 'Qty'),
                  keyboardType: TextInputType.number)),
          const SizedBox(width: 8),
          Expanded(
              flex: 2,
              child: TextFormField(
                  controller: asset.unitController,
                  decoration: const InputDecoration(labelText: 'Unit'))),
          if (_assets.length > 1)
            IconButton(
                icon: const Icon(Iconsax.trash, color: Colors.redAccent),
                onPressed: () => _removeAsset(asset.id)),
        ],
      ),
    );
  }

  Widget _buildKycForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("KYC Documents", style: Theme.of(context).textTheme.displaySmall),
        const SizedBox(height: 24),
        ImagePickerWidget(
            label: 'Aadhar Card Photo',
            onImagePicked: (file) => _aadharImage = file),
        const SizedBox(height: 24),
        ImagePickerWidget(
            label: 'PAN Card Photo', onImagePicked: (file) => _panImage = file),
      ],
    );
  }

  Widget _buildNavigationButtons() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [
          BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, -5))
        ],
      ),
      child: Row(
        children: [
          if (_currentStep > 0)
            TextButton(
              onPressed: () => setState(() => _currentStep--),
              child: const Text('Back'),
            ),
          const Spacer(),
          ElevatedButton(
            onPressed: () async {
              if (_currentStep < _stepperData.length - 1) {
                setState(() => _currentStep++);
              } else {
                // Save artisan to database
                final artisan = Artisan(
                  name: _nameController.text,
                  phone: _phoneController.text,
                  village: _villageController.text,
                  district: _districtController.text,
                  state: _stateController.text,
                  professions: _selectedProfessions.join(','),
                  assets: jsonEncode(_assets
                      .map((a) => {
                            'name': a.nameController.text,
                            'quantity': a.quantityController.text,
                            'unit': a.unitController.text
                          })
                      .toList()),
                  aadharImagePath: _aadharImage?.path,
                  panImagePath: _panImage?.path,
                );
                await DatabaseHelper.instance.createArtisan(artisan);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                      content: Text('Artisan saved locally!'),
                      backgroundColor: Colors.green),
                );
                Navigator.pop(context, true);
              }
            },
            child: Text(_currentStep < _stepperData.length - 1
                ? 'Next'
                : 'Save Artisan'),
          ),
        ],
      ),
    );
  }
}
