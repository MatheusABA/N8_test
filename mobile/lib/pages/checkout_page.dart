import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/utils/user_utils.dart';
import 'dart:convert';

class CheckoutPage extends StatefulWidget {
  final List cart;
  final double subtotal;
  final VoidCallback onCartChanged;

  const CheckoutPage({super.key, required this.cart, required this.subtotal, required this.onCartChanged});

  @override
  State<CheckoutPage> createState() => _CheckoutPageState();
}

class _CheckoutPageState extends State<CheckoutPage> {
  final _formKey = GlobalKey<FormState>();
  final _cardNumberController = TextEditingController();
  final _cardNameController = TextEditingController();
  final _cardExpiryController = TextEditingController();
  final _cardCvvController = TextEditingController();


  Future<void> finalizarCompra() async {
    final anonUserId = await getOrCreateUserId();

    // Monta os itens no formato esperado pelo schema do prisma
    final items = widget.cart.map((item) {
      final produto = item['produto'];
      final isNacional = produto.containsKey('nome');
      return {
        'id': produto['id'],
        'nome': isNacional ? produto['nome'] : produto['name'],
        'preco': isNacional ? produto['preco'] : produto['price'],
        'quantity': item['quantidade'],
      };
    }).toList();

    final body = {
      'anonUserId': anonUserId,
      'items': items,
      'total': widget.subtotal,
    };

    final response = await http.post(
      Uri.parse('http://192.168.1.12:3000/sales'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );

    if (response.statusCode == 201) {
      widget.cart.clear();
      widget.onCartChanged();
      
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Compra realizada!'),
          content: const Text('Obrigado pela sua compra.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).popUntil((route) => route.isFirst);
              },
              child: const Text('OK'),
            ),
          ],
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Ops! Não foi possivel finalizar a compra. Tente novamente.')),
      );
    }
  }

  @override
  void dispose() {
    _cardNumberController.dispose();
    _cardNameController.dispose();
    _cardExpiryController.dispose();
    _cardCvvController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pagamento')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView(
          children: [
            const Text('Produtos:', style: TextStyle(fontWeight: FontWeight.bold)),
            ...widget.cart.map((item) {
              final produto = item['produto'];
              final quantidade = item['quantidade'];
              final isNacional = produto.containsKey('nome');
              final nome = isNacional ? produto['nome'] : produto['name'];
              final preco = isNacional ? produto['preco'] : produto['price'];
              return ListTile(
                title: Text(nome ?? 'Produto sem nome'),
                subtitle: Text('Qtd: $quantidade'),
                trailing: Text('R\$ ${(double.tryParse(preco.toString())! * quantidade).toStringAsFixed(2)}'),
              );
            }),
            const Divider(),
            Text('Total: R\$ ${widget.subtotal.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 24),
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _cardNumberController,
                    decoration: const InputDecoration(labelText: 'Número do cartão'),
                    keyboardType: TextInputType.number,
                    maxLength: 16,
                    validator: (value) {
                      if (value == null || value.length != 16) return 'Informe 16 dígitos';
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: _cardNameController,
                    decoration: const InputDecoration(labelText: 'Nome impresso no cartão'),
                    validator: (value) {
                      if (value == null || value.isEmpty) return 'Informe o nome';
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: _cardExpiryController,
                    decoration: const InputDecoration(labelText: 'Validade (MM/AA)'),
                    maxLength: 5,
                    validator: (value) {
                      if (value == null || !RegExp(r'^\d{2}/\d{2}$').hasMatch(value)) return 'Formato inválido';
                      return null;
                    },
                  ),
                  TextFormField(
                    controller: _cardCvvController,
                    decoration: const InputDecoration(labelText: 'CVV'),
                    keyboardType: TextInputType.number,
                    maxLength: 3,
                    validator: (value) {
                      if (value == null || value.length != 3) return 'Informe 3 dígitos';
                      return null;
                    },
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          await finalizarCompra();
                        }
                      },
                      child: const Text('Finalizar compra'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}