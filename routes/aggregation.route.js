import express from "express";
import { createUser } from "../controllers/userController.js";
import { averageRating, createOrder, hightCategoryPrice, listOfProductInOrder, mostRevenue, noOfOrders, orderAndAmountSpend, OrderStatus, reviewsAndRaiting, totalSpend, userNameAndTotalamount } from "../controllers/orderController.js";
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





export default router;


