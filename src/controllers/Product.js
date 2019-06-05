const mongoose = require('mongoose');
const Product = require('../models/Product');

const Controller = {
    index: (request, response) => {
        Product
            .find({})
            .exec()
            .then(products => {
                response
                    .status(200)
                    .json({
                        products,
                        total: products.length
                    });
            })
            .catch(error => {
                response(500)
                .json({
                    error
                });
            });
    },

    create: (request, response) => {
        Product
            .find()
            .exec()
            .then(products => {
                console.log(products);
                const newProduct = new Product({
                    _id: mongoose.Types.ObjectId(),
                    name: request.body.name,
                    price: request.body.price,
                    image: request.body.image
                });
        
                newProduct
                    .save()
                    .then(saved => {
                    response
                        .status(201)
                        .json({
                            message: 'Product created successfully.'
                        });
                    })
                    .catch(error => {
                    response
                        .status(500)
                        .json({
                            error
                        })
                    });
                
            })
            .catch(error => console.log(error));
    },

    read: (request, response) => {
        Product
            .findById(request.params.Id)
            .exec()
            .then(product => {
            response
                .status(200)          
                .json({
                    product
                });
            })
            .catch(error => {
            res
                .status(500)
                .json({
                error
                });
            });
    },

    delete: (request, response) => {
        Product
            .findByIdAndRemove(request.params.Id)
            .exec()
            .then(() => {
                response
                .status(200)
                .json({
                    message: 'Product was deleted.'
                });
            });
    },

    update:(request,response) =>{
        Product
            .findByIdAndUpdate(
                request.params.Id, 
                {$set: request.body}, 
                function (error, product) {
                    if (error) return next(error);
                    response.send('Product udpated.');
                }
            );
            // .findByIdAndUpdate(req.params.id)
            // .exec()
            // .then(()=>{
            //     res
            //         .status(200)
            //         .json({
            //             message:'User settings modify correctly'
            //         })
            // })
        },

    
    
}

module.exports = Controller;