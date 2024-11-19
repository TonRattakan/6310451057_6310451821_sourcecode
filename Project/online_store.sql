-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 31, 2023 at 01:19 PM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_price` int(10) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL,
  `product_amount` int(10) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table `cart`
INSERT INTO `cart` (`id`, `product_id`, `product_price`, `product_name`, `product_img`, `user_id`, `product_amount`) 
VALUES (1, 123, 19.99, 'Product Name', 'product.jpg', 1, 3);

-- Table structure for table `category`
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(2, 'Louis Vuitton');
-- --------------------------------------------------------

--
-- Table structure for table `mix_and_match`
--

CREATE TABLE `mix_and_match` (
  `id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_price` int(10) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `user_id` int(10) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table `mix_and_match`
INSERT INTO `mix_and_match` (`id`, `product_id`, `product_price`, `product_name`, `product_img`, `user_id`, `name`) 
VALUES (1, 123, 999999999, 'Product Test', 'product.png', 1, 'Test');

-- Table structure for table `product`
CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `type_of_fabric` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `color_scheme` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` varchar(20) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `sex` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Dumping data for table `product`
INSERT INTO `product` (`id`, `name`, `category`, `type`, `type_of_fabric`, `color`, `color_scheme`, `description`, `price`, `image`, `sex`) 
VALUES (1, 'Product Test', 'Louis Vuitton', 'เสื้อ', 'เสื้อ', 'สดใส', 'แดง', 'Test', 999999999, 'product.png', 'ชาย');

-- Table structure for table `type`
CREATE TABLE `type` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table `type`
INSERT INTO `type` (`id`, `name`) VALUES (1, 'กางเกง'), (3, 'เสื้อ');

-- Table structure for table `type_of_fabric`
CREATE TABLE `type_of_fabric` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Dumping data for table `type_of_fabric`
--

INSERT INTO `type_of_fabric` (`id`, `name`) VALUES
(2, 'เสื้อ'),
(3, 'กางเกง');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `urole` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `urole`) VALUES
(1, 'useruser@gmail.com', 'useruser', 'useruser', 'user'),
(2, 'adminadmin@gmail.com', 'adminadmin', 'adminadmin', 'admin'),
(4, 'useruser1234@gmail.com', 'useruser1234', 'useruser1234', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mix_and_match`
--
ALTER TABLE `mix_and_match`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product` DROP PRIMARY KEY;


--
-- Indexes for table `type`
--
ALTER TABLE `type` DROP PRIMARY KEY;


--
-- Indexes for table `type_of_fabric`
--
ALTER TABLE `type_of_fabric`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mix_and_match`
--
ALTER TABLE `mix_and_match`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product` MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`);


--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type` MODIFY `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY;


--
-- AUTO_INCREMENT for table `type_of_fabric`
--
ALTER TABLE `type_of_fabric`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
