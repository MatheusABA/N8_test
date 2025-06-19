import 'package:flutter/material.dart';
import 'package:mobile/pages/checkout_page.dart';

class CartPage extends StatefulWidget {
  final List cart;

  const CartPage({super.key, required this.cart});

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  double get subtotal {
    double total = 0;
    for (var item in widget.cart) {
      final produto = item['produto'];
      final quantidade = item['quantidade'];
      final isNacional = produto != null && produto.containsKey('nome');
      final preco = isNacional ? produto['preco'] : produto['price'];
      total += (double.tryParse(preco.toString()) ?? 0) * quantidade;
    }
    return total;
  }

  void alterarQuantidade(int index, int delta) {
    setState(() {
      widget.cart[index]['quantidade'] += delta;
      if (widget.cart[index]['quantidade'] < 1) {
        widget.cart[index]['quantidade'] = 1;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Carrinho de Compras')),
      body: widget.cart.isEmpty
          ? const Center(child: Text('Seu carrinho está vazio'))
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: widget.cart.length,
                    itemBuilder: (context, index) {
                      final item = widget.cart[index];
                      final produto = item['produto'];
                      
                      if (produto == null) {
                        return const ListTile(
                          title: Text('Produto inválido'),
                          subtitle: Text('Erro ao carregar produto'),
                        );
                      }

                      final quantidade = item['quantidade'];
                      final isNacional = produto != null && produto.containsKey('nome');
                      final nome = isNacional ? produto['nome'] : produto['name'];
                      final preco = isNacional ? produto['preco'] : produto['price'];


                      return ListTile(
                        title: Text(nome ?? 'Produto sem nome'),
                        subtitle: Text('R\$ ${preco ?? ''}'),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.remove),
                              onPressed: () => alterarQuantidade(index, -1),
                            ),
                            Text('$quantidade'),
                            IconButton(
                              icon: const Icon(Icons.add),
                              onPressed: () => alterarQuantidade(index, 1),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              tooltip: "Remover do carrinho",
                              onPressed: () {
                                setState(() {
                                  widget.cart.removeAt(index);
                                });
                              },
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Subtotal:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                          Text('R\$ ${subtotal.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => CheckoutPage(cart: widget.cart, subtotal: subtotal, onCartChanged: () => setState(() {})),
                              ),
                            );
                          },
                          child: const Text('Ir para o pagamento'),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}