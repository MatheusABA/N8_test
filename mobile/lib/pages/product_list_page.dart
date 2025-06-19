import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:mobile/pages/cart_page.dart';

class ProductListPage extends StatefulWidget {
  final List cart;
  final VoidCallback onCartChanged;

  const ProductListPage({
    super.key,
    required this.cart,
    required this.onCartChanged
  });

  @override
  State<ProductListPage> createState() => _ProductListPageState();
}

class _ProductListPageState extends State<ProductListPage> with SingleTickerProviderStateMixin{
  List products = [];
  bool loading = true;

  final endpoints = [
    {
      'label': 'Nacionais',
      'url': 'https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
    },
    {
      'label': 'Internacionais',
      'url': 'https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
    },
  ];

  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: endpoints.length, vsync: this);
    _tabController.addListener(() {
      if (_tabController.indexIsChanging) {
        fetchProducts(_tabController.index);
      }
    });
    fetchProducts(0);
  }

  Future<void> fetchProducts(int index) async {
    setState(() {
      loading = true;
    });
    try {
      final response = await http.get(Uri.parse(endpoints[index]['url']!));
      // print('Status code: ${response.statusCode}');
      if (response.statusCode == 200) {
        setState(() {
          products = json.decode(response.body);
          loading = false;
        });
        print('Produtos carregados: $products');
      } else {
        // print('Erro ao buscar produtos: ${response.body}');
        setState(() {
          loading = false;
        });
      }
    } catch (e) {
      // print('Erro ao buscar produtos: $e');
      setState(() {
        loading = false;
      });
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('N8 Ecommerce'),
        bottom: TabBar(
          controller: _tabController,
          tabs: endpoints.map((e) => Tab(text: e['label'])).toList(),
        ),
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : products.isEmpty
            ? const Center(child: Text('Nenhum produto encontrado'))
            : ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                
                // Normalizando os campos para evitar problemas de nomenclatura( name != nome )
                final isNacional = product.containsKey('nome');
                final nome = isNacional ? product['nome'] : product['name'];
                final descricao = isNacional ? product['descricao'] : product['description'];
                final preco = isNacional ? product['preco'] : product['price'];
                final imagem = isNacional
                    ? product['imagem']
                    : (product['gallery'] != null && product['gallery'].isNotEmpty
                        ? product['gallery'][0]
                        : null);

                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  child: ListTile(
                    leading: imagem != null
                      ? Image.network(
                        imagem,
                        width: 50,
                        height: 50,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => const Icon(Icons.broken_image),
                      )
                      : const Icon(Icons.image_not_supported),
                    title: Text(nome ?? 'Produto sem nome'),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(descricao ?? '', maxLines: 2, overflow: TextOverflow.ellipsis),
                        const SizedBox(height: 4),
                        Text('R\$ ${preco ?? ''}', style: const TextStyle(fontWeight: FontWeight.bold)),
                      ],
                    ),
                    isThreeLine: true,
                    trailing: IconButton(
                      icon: const Icon(Icons.add_shopping_cart),
                      onPressed: () {
                        final existingIndex = widget.cart.indexWhere(
                          (item) => item['produto'] != null && item['produto']['id'] == product['id'],
                        );

                        if (existingIndex >= 0) {
                          widget.cart[existingIndex]['quantidade'] += 1;
                        } else {
                          widget.cart.add({'produto': product, 'quantidade': 1});
                        }
                        widget.onCartChanged();

                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('$nome adicionado ao carrinho!')),
                        );
                      },
                    ),
                    ),
                  );
                },
              ),
    );
  }
}