import express from "express";
import { createUser } from "../controllers/userController.js";
import { averageRating, cityOrders, createOrder, hightCategoryPrice, listOfProductInOrder, mostRevenue, noOfOrders, notPlacedOrder, orderAndAmountSpend, OrderStatus, quantity, reviewsAndRaiting, spentMost, totalSaleAndRevenue, totalSpend, userNameAndTotalamount } from "../controllers/orderController.js";
import { createProduct } from "../controllers/productController.js";
import { createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post('/createUser', createUser)
router.post('/createOrder', createOrder)
router.post('/createProduct', createProduct)
router.post('/createReview', createReview)
router.get('/OrderStatus', OrderStatus)
router.get('/noOfOrders', noOfOrders)
router.get('/totalSpend', totalSpend)
router.get('/userNameAndTotalamount', userNameAndTotalamount)
router.get('/listOfProductInOrder', listOfProductInOrder)
router.get('/averageRating', averageRating)
router.get('/hightCategoryPrice', hightCategoryPrice)
router.get('/orderAndAmountSpend', orderAndAmountSpend)
router.get('/reviewsAndRaiting', reviewsAndRaiting)
router.get('/mostRevenue', mostRevenue)
router.get('/cityOrders', cityOrders)
router.get('/notPlacedOrder', notPlacedOrder)
router.get('/spentMost', spentMost)
router.get('/totalSaleAndRevenue', totalSaleAndRevenue)





export default router;


