import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile/utils/user_utils.dart';

class MyOrdersPage extends StatefulWidget {
  const MyOrdersPage({super.key});

  @override
  State<MyOrdersPage> createState() => _MyOrdersPageState();
}

class _MyOrdersPageState extends State<MyOrdersPage> {
  List orders = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchOrders();
  }

  Future<void> fetchOrders() async {
    setState(() => loading = true);
    final anonUserId = await getOrCreateUserId();
    final response = await http.get(
      Uri.parse('http://192.168.1.12:3000/sales?anonUserId=$anonUserId'),
    );
    if (response.statusCode == 200) {
      setState(() {
        orders = jsonDecode(response.body);
        loading = false;
      });
    } else {
      setState(() {
        loading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Erro ao buscar suas compras')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Minhas Compras')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : orders.isEmpty
              ? const Center(child: Text('Nenhuma compra encontrada'))
              : ListView.builder(
                  itemCount: orders.length,
                  itemBuilder: (context, index) {
                    final order = orders[index];
                    final items = order['items'] as List<dynamic>;
                    final createdAt = order['createdAt'];
                    String dataFormatada = '';
                    if (createdAt != null) {
                      final date = DateTime.tryParse(createdAt);
                      if (date != null) {
                        dataFormatada = '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
                      }
                    }
                    return Card(
                      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      child: ListTile(
                        title: Text(dataFormatada.isNotEmpty
                          ? 'Compra feita em $dataFormatada'
                          : 'Compra'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            ...items.map((item) => Text(
                                  '${item['nome']} x${item['quantity']} - R\$ ${item['preco']}',
                                  style: const TextStyle(fontSize: 13),
                                )),
                            const SizedBox(height: 8),
                            Text('Total: R\$ ${order['total']}', style: const TextStyle(fontWeight: FontWeight.bold)),
                          ],
                        ),
                        isThreeLine: true,
                      ),
                    );
                  },
                ),
    );
  }
}