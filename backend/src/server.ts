// Importa o módulo 'fastify' e cria uma instância do Fastify chamada 'fastify'
import fastify from "fastify";

// Importa a função 'usersRoutes' do módulo './routes/users'
import { usersRoutes } from "./routes/users";
import { ordersRoutes } from "./routes/orders";
import { notificationsRoutes } from "./routes/notifications";
import { productsRoutes } from "./routes/products";
import { transactionsRoutes } from "./routes/transactions";
import { suppliersRoutes } from "./routes/suppliers";
import { productReviewsRoutes } from "./routes/product_reviews";
import { paymentMethodsRoutes } from "./routes/payment_methods";
import { categoriesRoutes } from "./routes/categories";
import { couponsRoutes } from "./routes/coupons";
import { shoppingCartsRoutes } from "./routes/shopping_carts";
import { shippingMethodsRoutes } from "./routes/shipping_methods";
import { returnsRoutes } from "./routes/returns";
import { refundsRoutes } from "./routes/refunds";
import { wishlistsRoutes } from "./routes/wishlists";
import { productVariantsRoutes } from "./routes/product_variants";


// Cria uma instância do Fastify chamada 'app'
const app = fastify();

// Registra todas as rotas
app.register(usersRoutes);
app.register(productsRoutes);
app.register(ordersRoutes);
app.register(transactionsRoutes);
app.register(suppliersRoutes);
app.register(productReviewsRoutes);
app.register(paymentMethodsRoutes);
app.register(categoriesRoutes);
app.register(couponsRoutes);
app.register(shoppingCartsRoutes);
app.register(shippingMethodsRoutes);
app.register(notificationsRoutes);
app.register(returnsRoutes);
app.register(refundsRoutes);
app.register(wishlistsRoutes);
app.register(productVariantsRoutes);





// Inicia o servidor HTTP na porta 3333
app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server running on port 3333");
});