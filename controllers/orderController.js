import {OrderModel} from "../models/orderModel.js";
import { ProductModel } from "../models/productModel.js";
import { ReviewModel } from "../models/reviewModel.js";
import { User } from "../models/userModel.js";

export const createOrder = async (req, res) => {
    try{
        const data = new OrderModel(req.body);
        const saveData = await data.save();
        res.status(200).json({
            msg: "Data saved",
            saveData
        })
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

export const  OrderStatus = async (req, res) => {
    try {
        const order = await OrderModel.aggregate([
            {$match: {status:"completed"}}
        ])
        res.status(200).json({
            order: order
        })
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

export const noOfOrders = async (req, res) => {
    try{
        const orders = await OrderModel.aggregate([
            {$group: {
                _id: "$userId",
                totalOrders: {$sum: 1}
            }}
        ])
        res.status(200).json({orders: orders})
    }  catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

export const totalSpend = async (req, res) => {
    try {
        const spend = await OrderModel.aggregate([
           {$group: {
            _id: "$userId",
            totalSpend: {$sum: "$totalAmount"}
           }}
        ])
        res.status(200).json({
            TotalSpend: spend
        })
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

export const userNameAndTotalamount = async (req, res) => {
    try {
        const join = await OrderModel.aggregate([
            {$lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }},
            {$unwind: "$user"},
            {
                $project: {
                    _id: 0,
                    userName: "$user.name",
                    totalAmount: 1
                }
            }
        ])
        res.status(200).json({join})
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

// Show list of products in each order (joined from products)

export const listOfProductInOrder = async (req, res) => {
    try{
        const order = await OrderModel.aggregate([
            {$unwind: "$items"},
            {
                $lookup: {
                    from: "productmodels",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {$unwind: "$productInfo"},
            {
                $project: {
                    orderId: "$_id",
                    productName: "$productInfo.name",
                    quantity: "$items.quantity",
                    itemTotal: {$multiply: ["$items.quantity", "$items.price" ]}
                }
            }
        ])
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

// Average rating for each product

export const averageRating = async (req, res) => {
    try {
        const average = await ReviewModel.aggregate([
            {$group: {
                _id: "$productId",
                avgRaiting: {$avg: "$rating"},
                totalReviews: {$sum: 1}

            }}
        ])
        res.status(200).json(average)
    }  catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

//   Which category has the highest average price?

export const  hightCategoryPrice = async (req, res) => {
    try {
        const hightPrice = await ProductModel.aggregate([
            {$group: {
                _id: "$category",
                avgPrice: {$avg: "$price"},

            }},
            {$sort: {avgPrice: -1}},
            {$limit: 1}
        ])
        res.status(200).json(hightPrice)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
} 

export const  orderAndAmountSpend = async (req, res) => {
    try{
        const orders = await OrderModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalOrder: {$sum: 1},
                    totalAmount: {$sum: "$totalAmount"}
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "users"
                }
            },
            {$unwind: "$users"},
            {
                $project: {
                    _id: 0,
                    user: "$users.name",
                    email: "$users.email",
                    totalOrder: 1,
                    totalAmount: 1
                }
            }
        ])

        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

// Show all products with their average rating and number of reviews
export const  reviewsAndRaiting = async (req, res) => {
    try{
        const review = await ReviewModel.aggregate([
            {
                $group: {
                    _id: "$productId",
                    reviewCount: {$sum: 1},
                    avgRaiting: {$avg: "$rating"}

                }
            },
            {
                $lookup: {
                    from: "productmodels",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {$unwind: "$product"},
            {
                $project: {
                    _id: 0,
                    projectName: "$product.name",
                    category: "$product.category",
                    reviewCount: 1,
                    avgRaiting: 1
                }
            },
            {$sort: {avgRaiting: -1}}
        ])

        res.status(200).json(review)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}


// Which product generated the most revenue across all orders?

export const mostRevenue = async (req, res) => {
    try{
        const revenue = await OrderModel.aggregate([
            {$unwind: "$items"},
            {
                $group: {
                    _id: "$items.productId",
                    revenue: {$sum: { $multiply: ["$items.quantity", "$items.price"]}}
                }
            },
            {
                $lookup: {
                    from: "productmodels",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {$unwind: "$product"},
            {$project: {
                _id: 0,
                productName: "$product.name",
                revenue: 1
            }},
            {$sort: {revenue: -1}},
            {$limit: 1}
        ])

        res.status(200).json(revenue)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}


//   . Top 3 cities by total number of orders

export const cityOrders = async (req, res) => {
    try{
        const order = await OrderModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {$unwind: "$user"},
            {
                $group: {
                    _id: "$user.city",
                    totalOrders: {$sum: 1}
                }
            },
            {$sort: {totalOrders: -1}},
            {$limit: 3}
           
        ])
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}


//  13. Find all users who haven't placed any orders

export const notPlacedOrder = async (req, res) => {
    try{
        const user = await User.aggregate([
            {
                $lookup: {
                    from: "ordermodels",
                    localField: "_id",
                    foreignField: "userId",
                    as: "userOrders"
                }
            },
            
            {
                $match: {
                    userOrders: {$eq: []}
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1
                }
            }
        ])

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}
// List all orders where any product has quantity > 1

export const quantity = async (req, res) => {
    try{
        const order = await OrderModel.aggregate([
            {$unwind: "$items"},
            {$match: {
                "items.quantity": {$gt: 1}
            }},
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    items: 1,
                    totalAmount: 1
                }
            }
        ])
        res.status(200).json(order)
    }catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}

// Top 3 users who spent the most

export const spentMost = async (req, res) => {
    try{
        const order = await OrderModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalAmount: {$sum: "$totalAmount"}

                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {$unwind: "$user"},
            {
                $project: {
                    _id: 0,
                    Name: "$user.name",
                    email: "$user.email",
                    totalAmount: 1
                }
            },
            {$sort: {totalAmount: -1}},
            {$limit: 2}

        ])
        res.status(200).json(order)
    }catch (err) {
        res.status(500).json({
            msg: "internal error"
        })
    }
}