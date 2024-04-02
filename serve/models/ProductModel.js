const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductType = {
	title: String,
	introduction: String,
	cover: String, // 封面
	detail: String,
	author: String,
	editTime: Date
}
const ProductModel = mongoose.model("Product", new Schema(ProductType))

module.exports = ProductModel