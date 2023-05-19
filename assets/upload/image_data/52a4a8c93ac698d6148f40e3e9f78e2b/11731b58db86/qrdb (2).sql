-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2023 at 01:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qrdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `aname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `aname`, `email`, `password`) VALUES
(1, 'admin1', 'admin@gmail.com', '$2b$10$cLFPNIibKrNUUz4ZZp6Uae2B/cFjhIJAJXJpLdRnjaoLwLJ91JH6y');

-- --------------------------------------------------------

--
-- Table structure for table `channel`
--

CREATE TABLE `channel` (
  `channel_id` varchar(50) NOT NULL,
  `channelName` varchar(30) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `channel`
--

INSERT INTO `channel` (`channel_id`, `channelName`, `apikey`, `instance_id`) VALUES
('0b2a730f7d8849c6', 'QIT members', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('540d7de96c686acb', 'asd', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('5bea34d2931b1f0a', 'niok', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('6de735f6ce0c', 'sadasd', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('6ffb846975ad', 's', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('acb187eb6d80afdb', 'TESTING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('bd0211d846185762', 'asdfg', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('ef2540a69028', 'abc', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('fd795654a1fb2cd6', 'q', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `apikey`, `name`, `email`, `phone`, `instance_id`) VALUES
('000b9371cae7b1ba', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Arvindbhai', 'abc@gmail.com', 9979615639, '11731b58db86'),
('00319aba0fabb1c4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinitbhai', 'abc@gmail.com', 9724939057, '11731b58db86'),
('00a26729de6f730f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pankajbhai', 'abc@gmail.com', 9913748773, '11731b58db86'),
('00b356ffc2c07441', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bijalmedam', 'abc@gmail.com', 9375111670, '11731b58db86'),
('018956aec4534d34', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Swapnilbhai', 'abc@gmail.com', 9173027358, '11731b58db86'),
('03007b560bfb1f2f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Akbhai', 'abc@gmail.com', 8238233647, '11731b58db86'),
('03041348ea66372a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jaybhai', 'abc@gmail.com', 9099232066, '11731b58db86'),
('0385f55d19256379', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rushikesbhai', 'abc@gmail.com', 9737592897, '11731b58db86'),
('03ebe1784e3a4d68', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajubhai', 'abc@gmail.com', 9909152454, '11731b58db86'),
('040118176e6e2987', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Smitbhai', 'abc@gmail.com', 9662188623, '11731b58db86'),
('081e9ae96dc9de97', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinodbhai', 'abc@gmail.com', 9825804591, '11731b58db86'),
('08444091453dd79e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Priyankamem', 'abc@gmail.com', 9924107199, '11731b58db86'),
('08c28cd19fa5c4fe', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Snehalbhai', 'abc@gmail.com', 7622961758, '11731b58db86'),
('091c923aa2ecc790', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dr Rathod', 'abc@gmail.com', 9421870206, '11731b58db86'),
('092320cf1db614b1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vibhumedam', 'abc@gmail.com', 9727000709, '11731b58db86'),
('095053988da44183', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Prathbhai', 'abc@gmail.com', 9824972986, '11731b58db86'),
('09e2788e643faa15', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dipakbhai', 'abc@gmail.com', 9558867467, '11731b58db86'),
('0a72e64f09fdd809', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Khusbumem', 'abc@gmail.com', 8690904047, '11731b58db86'),
('0aef49cac6308489', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pdpatelsir', 'abc@gmail.com', 9879058595, '11731b58db86'),
('0b3671f38c5dd7a9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Govrdhnbhai', 'abc@gmail.com', 9408885700, '11731b58db86'),
('0ca3ef3bccff256f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Harshbhai', 'abc@gmail.com', 9662802517, '11731b58db86'),
('0ca4884cd8a987f6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayantibhai', 'abc@gmail.com', 9825444200, '11731b58db86'),
('0ebec72455678375', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shreybhai', 'abc@gmail.com', 9824882958, '11731b58db86'),
('126df56547a06ca6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mittumedam', 'abc@gmail.com', 9377128709, '11731b58db86'),
('12c6a5ebb721aa04', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Miteshbhai', 'abc@gmail.com', 7383258964, '11731b58db86'),
('12e6cd1377e21d66', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hameerbhai', 'abc@gmail.com', 9909663817, '11731b58db86'),
('1311d0c9723c2095', '52a4a8c93ac698d6148f40e3e9f78e2b', 'sakshi', 'sakshirangwala@gmail.com', 7624032023, '11731b58db86'),
('131de3f40482fdba', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sanjaybhai', 'abc@gmail.com', 9825046536, '11731b58db86'),
('14d3f638b6923ae4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jenilbhai', 'abc@gmail.com', 9429857932, '11731b58db86'),
('1527fb639c168306', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Anilbhai', 'abc@gmail.com', 9825368754, '11731b58db86'),
('175468144b1c33b6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dipakbhai', 'abc@gmail.com', 9558867467, '11731b58db86'),
('17cae2a1ac703292', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritimedam', 'abc@gmail.com', 9426872428, '11731b58db86'),
('1805abccdeef2f7c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rambhai', 'abc@gmail.com', 9879394205, '11731b58db86'),
('1817178dc8d4c18c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jenilbhai', 'abc@gmail.com', 9429857932, '11731b58db86'),
('18760a0d0ae7e27f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pramodbhai', 'abc@gmail.com', 8866245760, '11731b58db86'),
('188930b070a8be3d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kanubhai', 'abc@gmail.com', 8460880673, '11731b58db86'),
('18b028ad2627d4e9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kevalbhai', 'abc@gmail.com', 8141206644, '11731b58db86'),
('198e803027678322', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vishal', 'abc@gmail.com', 9978441018, '11731b58db86'),
('19f977e79dff1065', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Freedybhai', 'abc@gmail.com', 9898991043, '11731b58db86'),
('1a2c5f669c13ed36', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Priynsubhai', 'abc@gmail.com', 9924702288, '11731b58db86'),
('1af70ddc1afd4be5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Parulben', 'abc@gmail.com', 9978846658, '11731b58db86'),
('1aff10bf3bdc13bc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Truptimem', 'abc@gmail.com', 8000111847, '11731b58db86'),
('1b71d0f212c89f3e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayesbhai', 'abc@gmail.com', 9687073764, '11731b58db86'),
('1bb652dec95b8174', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nileshbhai', 'abc@gmail.com', 7600391660, '11731b58db86'),
('1c2ea42d38294d06', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Archna Mem', 'abc@gmail.com', 7778000462, '11731b58db86'),
('1d37efe78865c3df', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayantibhai', 'abc@gmail.com', 9579791166, '11731b58db86'),
('1e6e0b2284f2eaba', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Alpeshbhai', 'abc@gmail.com', 9574160542, '11731b58db86'),
('1e6f0fde715d280f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ankitbhai', 'abc@gmail.com', 9727164324, '11731b58db86'),
('1e9f0f3f5ee8aa06', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kamlesbhai', 'abc@gmail.com', 8511101792, '11731b58db86'),
('210cc7b91866f366', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jignesbhai', 'abc@gmail.com', 9913800567, '11731b58db86'),
('216097757a71a581', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sunnybhai', 'abc@gmail.com', 8401562809, '11731b58db86'),
('237f0b640c247ecf', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Punam Mem', 'abc@gmail.com', 8460002132, '11731b58db86'),
('23e5485549f875ea', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dipakbhai', 'abc@gmail.com', 9998221917, '11731b58db86'),
('23f00d2f11ceefea', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Purabbhai', 'abc@gmail.com', 9890929069, '11731b58db86'),
('24500aafaf9293eb', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bhaumikbhai', 'abc@gmail.com', 9725904040, '11731b58db86'),
('25cf95ad80f22fce', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Priynsubhai', 'abc@gmail.com', 9924702288, '11731b58db86'),
('262e4d045bdfdc3b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shilesbhai', 'abc@gmail.com', 9427896496, '11731b58db86'),
('28ae4e6130bd6f12', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Naresbhai', 'abc@gmail.com', 9825640932, '11731b58db86'),
('2924f20a012f08ee', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Arudhritbhai', 'abc@gmail.com', 9879113314, '11731b58db86'),
('295b3b76e0bb4317', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vivekbhai', 'abc@gmail.com', 9879778914, '11731b58db86'),
('2a0366eff4078861', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hetalben', 'abc@gmail.com', 9978733382, '11731b58db86'),
('2a759370a13e3e0a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ankitbhai', 'abc@gmail.com', 9727164324, '11731b58db86'),
('2af5f84e7a8cc471', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritesbhai', 'abc@gmail.com', 9925239134, '11731b58db86'),
('2bd6688dcf8afbb7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hameerbhai', 'abc@gmail.com', 9909663817, '11731b58db86'),
('2dfe1dcac06ce724', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dasbhai', 'abc@gmail.com', 9825100053, '11731b58db86'),
('2e06fdd930118202', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mitesbhai', 'abc@gmail.com', 9913131825, '11731b58db86'),
('2e212b9d837b4075', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vikashbhai', 'abc@gmail.com', 7041750952, '11731b58db86'),
('2e465d5690debea2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hiteshbhai', 'abc@gmail.com', 9998964594, '11731b58db86'),
('2eead24426a37326', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Miramedam', 'abc@gmail.com', 9712919100, '11731b58db86'),
('2fc05c84c26f08a2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sunilbhai', 'abc@gmail.com', 9978124141, '11731b58db86'),
('2fd630a2ebff9ae9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Arudhritbhai', 'abc@gmail.com', 9879113314, '11731b58db86'),
('30b7729ba82f6491', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pravinbhai', 'abc@gmail.com', 9879311110, '11731b58db86'),
('30d8af06eab68164', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kartikbhai', 'abc@gmail.com', 9925626273, '11731b58db86'),
('3361845720ee980b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritesbhai', 'abc@gmail.com', 9998045888, '11731b58db86'),
('35eb88f7dbb94887', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sumitbhai', 'abc@gmail.com', 9016040472, '11731b58db86'),
('365680496ca075b4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vijaybhai', 'abc@gmail.com', 9726222566, '11731b58db86'),
('36ad339647906304', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nirajbhai', 'abc@gmail.com', 9687191044, '11731b58db86'),
('36b530d8ff2dc5fa', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dipakbhai', 'abc@gmail.com', 9998221917, '11731b58db86'),
('388c11f44d8d2832', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dipesh', 'abc@gmail.com', 7874243798, '11731b58db86'),
('390d37f16b64eb2b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Tirthbhai', 'abc@gmail.com', 9712644430, '11731b58db86'),
('3a56c699c8540fbb', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayesbhai', 'abc@gmail.com', 9909241212, '11731b58db86'),
('3aa11911f1c85743', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinodbhai', 'abc@gmail.com', 9099078896, '11731b58db86'),
('3ba31677de216f35', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mitesbhai', 'abc@gmail.com', 9913131825, '11731b58db86'),
('3baf2528c6643923', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Yoginiben', 'abc@gmail.com', 9714877699, '11731b58db86'),
('3cd0ad5311bb9f54', '52a4a8c93ac698d6148f40e3e9f78e2b', 'P K Sir', 'abc@gmail.com', 9825361070, '11731b58db86'),
('3d40251d1d8010a8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vivekbhai', 'abc@gmail.com', 9712957322, '11731b58db86'),
('3d5b82a5a98a74b5', '8b4b3577d4661f0ce820e4082b14843d', 'harsh gajjar', 'abc@gmail.com', 9875896589, '035f4d70aceb'),
('3ebfedf32f0a3f3c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nirajbhai', 'abc@gmail.com', 9687191044, '11731b58db86'),
('3f2710b981494182', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Alpeshbhai', 'abc@gmail.com', 9574160542, '11731b58db86'),
('3f8937ca99224089', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajbhai', 'abc@gmail.com', 7096145605, '11731b58db86'),
('41505a0ff52dcd28', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bhaumikbhai', 'abc@gmail.com', 9725904040, '11731b58db86'),
('429ec27041d21a09', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mrunagbhai', 'abc@gmail.com', 7600165933, '11731b58db86'),
('4379660beb9fa67f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kandarpbhai', 'abc@gmail.com', 9978922112, '11731b58db86'),
('44aa21f0817c8ce6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Subhambhai', 'abc@gmail.com', 7600685582, '11731b58db86'),
('44e9c8585704a925', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Binaben', 'abc@gmail.com', 9913358966, '11731b58db86'),
('46aac62e6ad01665', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nisantbhai', 'abc@gmail.com', 7698003407, '11731b58db86'),
('4734663fca5804ca', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Visnubhai', 'abc@gmail.com', 7891837707, '11731b58db86'),
('4775562ddb9ee13e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinodbhai', 'abc@gmail.com', 9099078896, '11731b58db86'),
('477594711d6cbaf1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Niraliben', 'abc@gmail.com', 9173895582, '11731b58db86'),
('47a809b1b18677f1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vikashbhai', 'abc@gmail.com', 7041750952, '11731b58db86'),
('4883b135a6d99056', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Miramedam', 'abc@gmail.com', 9712919100, '11731b58db86'),
('48c5e232f2b54f3c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pravinbhai', 'abc@gmail.com', 9879311110, '11731b58db86'),
('49086a7ed0a73b8d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mukesbhai', 'abc@gmail.com', 9925013268, '11731b58db86'),
('491879b28300a4d2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hardikbhai', 'abc@gmail.com', 9624439248, '11731b58db86'),
('499a924eaeb2f28f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajbhai', 'abc@gmail.com', 7096145605, '11731b58db86'),
('499de989e039293d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'B Sahu Sir', 'abc@gmail.com', 9909901030, '11731b58db86'),
('49ecbafe100fc691', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Twinkle Mem', 'abc@gmail.com', 8866568784, '11731b58db86'),
('4acaa687e0e218e2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Customer', 'abc@gmail.com', 9727250207, '11731b58db86'),
('4b0bb203ebe5898d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dikshitbhai', 'abc@gmail.com', 9099156006, '11731b58db86'),
('4b1dc47b8fa88b44', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Govrdhnbhai', 'abc@gmail.com', 9408885700, '11731b58db86'),
('4b4bdd0545a1786b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dasbhai', 'abc@gmail.com', 9825100053, '11731b58db86'),
('4b99435e6e77090e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Viralbhai', 'abc@gmail.com', 9510510049, '11731b58db86'),
('4c0212eafc50012c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kanubhai', 'abc@gmail.com', 8460880673, '11731b58db86'),
('4d2f827b1158e3fe', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kevalbhai', 'abc@gmail.com', 9662522188, '11731b58db86'),
('4e38eddf3e6f9be5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayesbhai', 'abc@gmail.com', 9909241212, '11731b58db86'),
('4e4535b64984eaa2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajndrabhai', 'abc@gmail.com', 9879100341, '11731b58db86'),
('4e70744056c8938a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinaybhai', 'abc@gmail.com', 9426010968, '11731b58db86'),
('4f8b7a2142e7d2ef', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kandarpbhai', 'abc@gmail.com', 9978922112, '11731b58db86'),
('4fa90fc746db0638', '52a4a8c93ac698d6148f40e3e9f78e2b', 'harsh', 'hpgh048@gmail.com', 8320729231, '11731b58db86'),
('500a31d4965b1017', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pdpatelsir', 'abc@gmail.com', 9879058595, '11731b58db86'),
('50ace9217dd63f42', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mahesbhai', 'abc@gmail.com', 9762774036, '11731b58db86'),
('51301e35d5479ca8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Twinkle Mem', 'abc@gmail.com', 8866568784, '11731b58db86'),
('5376420ac492c84b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Customer', 'abc@gmail.com', 9727250207, '11731b58db86'),
('53a6f9145aaec62c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vimalbhai', 'abc@gmail.com', 9898866464, '11731b58db86'),
('53f2ae677a8f0c69', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nimisaben', 'abc@gmail.com', 9426545040, '11731b58db86'),
('54ca464b8bd35a88', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Archnaben', 'abc@gmail.com', 9327411328, '11731b58db86'),
('54d958ebcc0d7dfb', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Swetamem', 'abc@gmail.com', 9687637241, '11731b58db86'),
('5569a6602406341e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shreybhai', 'abc@gmail.com', 9824882958, '11731b58db86'),
('558ef7a76aa933f1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Juhilbhai', 'abc@gmail.com', 8128111999, '11731b58db86'),
('567a477dbfbb0128', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dharmesbhai', 'abc@gmail.com', 9824575769, '11731b58db86'),
('576247615f4a9904', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mananbhai', 'abc@gmail.com', 8980916155, '11731b58db86'),
('5858a2225ac79aa9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hetalben', 'abc@gmail.com', 9978733382, '11731b58db86'),
('591c345844f85471', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Himanshu', 'abc@gmail.com', 9375144111, '11731b58db86'),
('5920c474c902f7b5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rosanbhai', 'abc@gmail.com', 9925898001, '11731b58db86'),
('5926554c585bc2a4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Gauravbhai', 'abc@gmail.com', 9558823435, '11731b58db86'),
('5a131cc46fa0ed7b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritimedam', 'abc@gmail.com', 9426872428, '11731b58db86'),
('5a5eb44d85de0b73', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Amishbhai', 'abc@gmail.com', 9925352299, '11731b58db86'),
('5a8e10d55fc45543', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Binaben', 'abc@gmail.com', 9913358966, '11731b58db86'),
('5b70237a19125b9f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Maheshbhai', 'abc@gmail.com', 9099219314, '11731b58db86'),
('5d9deede7c4dbc90', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Punamben', 'abc@gmail.com', 9377842453, '11731b58db86'),
('5df5d5aff1bc1eae', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ramesbhai', 'abc@gmail.com', 9558409934, '11731b58db86'),
('5e02bcb7e7578def', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Diyamem', 'abc@gmail.com', 9537537999, '11731b58db86'),
('5e02fdc3356ba6fd', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rakeshbhai', 'abc@gmail.com', 9998906996, '11731b58db86'),
('5e0db56d793d7cb4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mitaliben', 'abc@gmail.com', 9909140078, '11731b58db86'),
('604378ed067e9636', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Heenamem', 'abc@gmail.com', 8460515251, '11731b58db86'),
('612b35e67e507f1d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Gauravbhai', 'abc@gmail.com', 9925134444, '11731b58db86'),
('61f239c3b880e941', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shamikbhai', 'abc@gmail.com', 9909901241, '11731b58db86'),
('62805e847a1b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'sd', 'sd@gmail.com', 7894561356, '49595459e83c'),
('637cc73c75a9f72f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jignesbhai', 'abc@gmail.com', 9913800567, '11731b58db86'),
('63ad9cc1551a0222', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Himanshu', 'abc@gmail.com', 9375144111, '11731b58db86'),
('63c0037e40541dd0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hiteshbhai', 'abc@gmail.com', 9099093043, '11731b58db86'),
('6473095fb506df21', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kartikbhai', 'abc@gmail.com', 9925626273, '11731b58db86'),
('671d984e18ac6a7b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mukesbhai', 'abc@gmail.com', 8511002860, '11731b58db86'),
('690101c09bc0ae62', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Heenamem', 'abc@gmail.com', 8460515251, '11731b58db86'),
('6a618c412267d5a7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Prasantbhai', 'abc@gmail.com', 9377699106, '11731b58db86'),
('6ad8f9cd9781fb51', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nirajbhai', 'abc@gmail.com', 8980171001, '11731b58db86'),
('6ae4d12426ee0d92', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nileshbhai', 'abc@gmail.com', 7600391660, '11731b58db86'),
('6af0d99d2faa7380', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nirajbhai', 'abc@gmail.com', 8980171001, '11731b58db86'),
('6b61e51208ec3764', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dhruvinbhai', 'abc@gmail.com', 7046666707, '11731b58db86'),
('6ba9b5b20ffa86dc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mukesbhai', 'abc@gmail.com', 8511002860, '11731b58db86'),
('6c288b4a0031b9fa', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sumitbhai', 'abc@gmail.com', 9016040472, '11731b58db86'),
('6cd31105cdc8f282', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Lalubhai', 'abc@gmail.com', 9879451300, '11731b58db86'),
('6d9e92d1cb7a5af5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jainishbhai', 'abc@gmail.com', 9909182037, '11731b58db86'),
('6dc8a5e265292bb8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Chandniben', 'abc@gmail.com', 9974416759, '11731b58db86'),
('6dd04ae5062cec32', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Naresbhai', 'abc@gmail.com', 9825640932, '11731b58db86'),
('6e79c9e32ad5eec1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ruchimedam', 'abc@gmail.com', 8401147236, '11731b58db86'),
('6ee9d6f4fd74f623', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jitubhai', 'abc@gmail.com', 9925206165, '11731b58db86'),
('6fb112c50a9ea909', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Parulben', 'abc@gmail.com', 9978846658, '11731b58db86'),
('6fedc504738009d4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinaybhai', 'abc@gmail.com', 9725643356, '11731b58db86'),
('7197821cac5c9577', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Divyesbhai', 'abc@gmail.com', 9824195949, '11731b58db86'),
('729a7e7fb04bfa20', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hetamedam', 'abc@gmail.com', 9426222201, '11731b58db86'),
('729e5506ed121647', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sudansubhai', 'abc@gmail.com', 9904404308, '11731b58db86'),
('72d17b97040fa78c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kamlesbhai', 'abc@gmail.com', 8511101792, '11731b58db86'),
('733acf935b1c140e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Chandresbhai', 'abc@gmail.com', 9879543178, '11731b58db86'),
('743b0bb3a0709a97', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kusalbhai', 'abc@gmail.com', 9726762100, '11731b58db86'),
('747070099835c8a0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Tapasbhai', 'abc@gmail.com', 8401859998, '11731b58db86'),
('755af895e9cd86ab', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Freedybhai', 'abc@gmail.com', 9898991043, '11731b58db86'),
('75fb8540b9cf3a76', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Garvitbhai', 'abc@gmail.com', 9724153080, '11731b58db86'),
('76b2c741c352f592', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kisanbhai', 'abc@gmail.com', 7698016240, '11731b58db86'),
('76d1a8f83591988c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayantibhai', 'abc@gmail.com', 9579791166, '11731b58db86'),
('7706b88f49160455', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bhaktimedam', 'abc@gmail.com', 9275045854, '11731b58db86'),
('77143a521b46bbdb', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Lakhanbhai', 'abc@gmail.com', 9662850193, '11731b58db86'),
('7a51f0ba7e3a585e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rambhai', 'abc@gmail.com', 9879394205, '11731b58db86'),
('7b10d641180009de', '52a4a8c93ac698d6148f40e3e9f78e2b', 'P K Sir', 'abc@gmail.com', 9825361070, '11731b58db86'),
('7d969ad04d7f51a2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nitinbhai', 'abc@gmail.com', 9723463681, '11731b58db86'),
('7e44cb786d182ea1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shivbhai', 'abc@gmail.com', 9825371811, '11731b58db86'),
('7e5ffd1ccec9b1ed', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Divyesbhai', 'abc@gmail.com', 9824195949, '11731b58db86'),
('7eb4fa00c8b7b866', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jiteshbhai', 'abc@gmail.com', 9879680004, '11731b58db86'),
('7eee4feb988093d7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sunilbhai', 'abc@gmail.com', 9978124141, '11731b58db86'),
('7f6bf14bfeba0c2a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shreyaben', 'abc@gmail.com', 8401362014, '11731b58db86'),
('81349c4a5c636aa3', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Tusarbhai', 'abc@gmail.com', 9998620720, '11731b58db86'),
('8144c2e848efe139', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mehulbhai', 'abc@gmail.com', 9825588754, '11731b58db86'),
('818888a60ef2897f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mittumedam', 'abc@gmail.com', 8128400676, '11731b58db86'),
('81e7e3d734086166', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sahidbhai', 'abc@gmail.com', 8000529129, '11731b58db86'),
('83aba9ec5b66fc0d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Lakhanbhai', 'abc@gmail.com', 9662850193, '11731b58db86'),
('83e7aac4d729c237', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dishamem', 'abc@gmail.com', 9998655044, '11731b58db86'),
('83fb50196ba5527c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Arti Mem', 'abc@gmail.com', 7874791172, '11731b58db86'),
('8440706399021fc9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bijalmedam', 'abc@gmail.com', 9375111670, '11731b58db86'),
('8463', '7dc9bfc4dfd4b763acef2492dbc95256', 'abc', 'abc@gmail.com', 1354648956, '035f4d70aceb'),
('8547dc0f2a2aaaac', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Salmanbhai', 'abc@gmail.com', 9033342411, '11731b58db86'),
('85797461a41913fe', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mitesbhai', 'abc@gmail.com', 9950690891, '11731b58db86'),
('881912801938269a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Keyurbhai', 'abc@gmail.com', 9427631363, '11731b58db86'),
('8a3abd5268804338', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajbhai', 'abc@gmail.com', 8469696978, '11731b58db86'),
('8b7f620bc704083a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Deepbhai', 'abc@gmail.com', 9925755440, '11731b58db86'),
('8b808e34dc451036', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Prasantbhai', 'abc@gmail.com', 9377699106, '11731b58db86'),
('8be557d982c4cddc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Gauravbhai', 'abc@gmail.com', 9558823435, '11731b58db86'),
('8c3031418f719bc4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vijaybhai', 'abc@gmail.com', 9726222566, '11731b58db86'),
('8cc69efd3bc1532a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ramesbhai', 'abc@gmail.com', 9558409934, '11731b58db86'),
('8cca74d836800d4a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mittumedam', 'abc@gmail.com', 8128400676, '11731b58db86'),
('8d3a96816513a17d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dhruvinbhai', 'abc@gmail.com', 7046666707, '11731b58db86'),
('8e14a3df25b556c5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Khyatiben', 'abc@gmail.com', 9624448027, '11731b58db86'),
('8f3ee711cd9bb62c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vivekbhai', 'abc@gmail.com', 9879778914, '11731b58db86'),
('8fc6e771b426abac', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jainishbhai', 'abc@gmail.com', 9909182037, '11731b58db86'),
('91a086bd59d3d0ff', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Naresbhai', 'abc@gmail.com', 9825375190, '11731b58db86'),
('9220af6b11e5c7f1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Swapnilbhai', 'abc@gmail.com', 9173027358, '11731b58db86'),
('92a3a0d9ce3c9fcf', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Niravbhai', 'abc@gmail.com', 9909902306, '11731b58db86'),
('92bdbfec2bb587c7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shilesbhai', 'abc@gmail.com', 9427896496, '11731b58db86'),
('933f2af80078545e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Swetamem', 'abc@gmail.com', 9898012501, '11731b58db86'),
('9403166180d39893', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Yoginiben', 'abc@gmail.com', 9714877699, '11731b58db86'),
('947e4e007ec85b3d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nishaben', 'abc@gmail.com', 9824747479, '11731b58db86'),
('94d4dee3c9c1f4ed', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kamleshbhai', 'abc@gmail.com', 9426137901, '11731b58db86'),
('9502365a30d7593c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rakeshbhai', 'abc@gmail.com', 9998906996, '11731b58db86'),
('951055bfd559a95a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Garvitbhai', 'abc@gmail.com', 9724153080, '11731b58db86'),
('987b47a493cc6d1d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Khyatiben', 'abc@gmail.com', 9624448027, '11731b58db86'),
('98b273823c3d3279', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Surendrabhai', 'abc@gmail.com', 9408793715, '11731b58db86'),
('98b744bcea1ed040', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Gauravbhai', 'abc@gmail.com', 9925134444, '11731b58db86'),
('9a9cfdfafbb8', '8b4b3577d4661f0ce820e4082b14843d', 'Elvis Branch', 'bcd@gmail.com', 9875896589, '035f4d70aceb'),
('9b787eedf1f93d79', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ishwarbhai', 'abc@gmail.com', 9822240404, '11731b58db86'),
('9ba7a100e4cf80c0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Anilbhai', 'abc@gmail.com', 9825368754, '11731b58db86'),
('9be115fa5831abea', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sudhirbhai', 'abc@gmail.com', 8238782166, '11731b58db86'),
('9bfe503c683ba8a6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Archnaben', 'abc@gmail.com', 9327411328, '11731b58db86'),
('9c18bc3829f336fc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kalpesbhai', 'abc@gmail.com', 9925477150, '11731b58db86'),
('9c34139d2218b68c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bharatbhai', 'abc@gmail.com', 7405346760, '11731b58db86'),
('9c4831398a0baa93', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Purabbhai', 'abc@gmail.com', 9890929069, '11731b58db86'),
('9c6363155e0b9546', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Maheshbhai', 'abc@gmail.com', 9099219314, '11731b58db86'),
('9dbbf4334f06e76e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Customer', 'abc@gmail.com', 9374727670, '11731b58db86'),
('9e1e5a0c26bf9ac0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinaybhai', 'abc@gmail.com', 9725643356, '11731b58db86'),
('9e39037032fffba2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hetamedam', 'abc@gmail.com', 9426222201, '11731b58db86'),
('9e8763973e5dc90a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vivekbhai', 'abc@gmail.com', 9712957322, '11731b58db86'),
('9ef4b8d30d2de8be', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Keyurbhai', 'abc@gmail.com', 9427631363, '11731b58db86'),
('9ef992ee5a441cef', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Naresbhai', 'abc@gmail.com', 9879639372, '11731b58db86'),
('9fab42af62334ee2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rushikesbhai', 'abc@gmail.com', 9737592897, '11731b58db86'),
('9ff6233d06652987', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sir', 'abc@gmail.com', 9825556742, '11731b58db86'),
('a0012f23437848fd', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayantibhai', 'abc@gmail.com', 9825444200, '11731b58db86'),
('a0129956afde2caa', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sonu', 'abc@gmail.com', 8866907638, '11731b58db86'),
('a070251f92a584c9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jaybhai', 'abc@gmail.com', 9099232066, '11731b58db86'),
('a0c0eec75a3fd8dd', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayesbhai', 'abc@gmail.com', 9687073764, '11731b58db86'),
('a0cedfd711344652', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayshriben', 'abc@gmail.com', 9428485801, '11731b58db86'),
('a13114a4cdf09475', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Priyankamem', 'abc@gmail.com', 9879103707, '11731b58db86'),
('a209c8d81a49146f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vaisaliben', 'abc@gmail.com', 9228800220, '11731b58db86'),
('a2180741c24ce762', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sir', 'abc@gmail.com', 9825233428, '11731b58db86'),
('a42c32bc0ee7dcfd', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kusalbhai', 'abc@gmail.com', 9726762100, '11731b58db86'),
('a43276e0e6ce8118', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shamikbhai', 'abc@gmail.com', 9909901241, '11731b58db86'),
('a436dc79743371ae', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sonu', 'abc@gmail.com', 8866907638, '11731b58db86'),
('a45cae44a144c8b8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Punamben', 'abc@gmail.com', 9377842453, '11731b58db86'),
('a58cc7386f06c78b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajndrabhai', 'abc@gmail.com', 9879100341, '11731b58db86'),
('a5970260307b8a4e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Deepbhai', 'abc@gmail.com', 9925755440, '11731b58db86'),
('a5c82cd6e20edb32', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Premilaben', 'abc@gmail.com', 9537200915, '11731b58db86'),
('a63ac85ff0eec13c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rupaben', 'abc@gmail.com', 9825910519, '11731b58db86'),
('a6fe4ac73a0c5cd6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kisanbhai', 'abc@gmail.com', 7698016240, '11731b58db86'),
('a727b5cae77f72f8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rosanbhai', 'abc@gmail.com', 9925898001, '11731b58db86'),
('a80cb5680f4c0129', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nimisaben', 'abc@gmail.com', 9426545040, '11731b58db86'),
('a8a30aa09abe0f20', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hardikbhai', 'abc@gmail.com', 9624439248, '11731b58db86'),
('a9e0adeaf9f1fb87', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sahidbhai', 'abc@gmail.com', 8000529129, '11731b58db86'),
('a9f803a5ce0583ba', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vatsalbhai', 'abc@gmail.com', 9033857118, '11731b58db86'),
('aa86d82c512a0239', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shivbhai', 'abc@gmail.com', 9825371811, '11731b58db86'),
('aad46e05585e96db', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mrunagbhai', 'abc@gmail.com', 7600165933, '11731b58db86'),
('ab99fcb92fee8cab', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nishaben', 'abc@gmail.com', 9824747479, '11731b58db86'),
('abc123', '52a4a8c93ac698d6148f40e3e9f78e2b', 'abc', 'abc@gmail.com', 1354648956, '816092a3e6ca'),
('abc12335464a s53', '7dc9bfc4dfd4b763acef2492dbc95256', 'abc', 'abc@gmail.com', 1354648956, '035f4d70aceb'),
('abcab3a6aeea46b5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nitinbhai', 'abc@gmail.com', 9723463681, '11731b58db86'),
('ac0e2402bc51f3b5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Surendrabhai', 'abc@gmail.com', 9408793715, '11731b58db86'),
('ad05f841fc18024a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Umeshbhai', 'abc@gmail.com', 9979204826, '11731b58db86'),
('ad4a9f7d322af543', '52a4a8c93ac698d6148f40e3e9f78e2b', 'poojan', 'poojangheewala7@gmail.com', 9313054702, '11731b58db86'),
('adb77b733560b59f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pankajbhai', 'abc@gmail.com', 9913748773, '11731b58db86'),
('adbce11306756254', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Swetamem', 'abc@gmail.com', 9687637241, '11731b58db86'),
('ae24d9c1afd7900c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinaybhai', 'abc@gmail.com', 9426010968, '11731b58db86'),
('ae51e01b9c91023f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nilpaben', 'abc@gmail.com', 9979932322, '11731b58db86'),
('ae6d9a1e172fbbb1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Chandresbhai', 'abc@gmail.com', 9879543178, '11731b58db86'),
('ae875911a5b2a078', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sudhirbhai', 'abc@gmail.com', 8238782166, '11731b58db86'),
('aec7f972af1007ec', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vijaybhai', 'abc@gmail.com', 9712928433, '11731b58db86'),
('af08e15f7c7c96a2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Harsadbhai', 'abc@gmail.com', 8460992846, '11731b58db86'),
('af0c02f3e371b2e8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Miteshbhai', 'abc@gmail.com', 7383258964, '11731b58db86'),
('aff989a069658b73', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Harshbhai', 'abc@gmail.com', 9662802517, '11731b58db86'),
('b1346ee7a6d19813', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Niraliben', 'abc@gmail.com', 9173895582, '11731b58db86'),
('b18c1e10160b85c9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sir', 'abc@gmail.com', 9825233428, '11731b58db86'),
('b1be027db52f9151', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Salmanbhai', 'abc@gmail.com', 9033342411, '11731b58db86'),
('b35cd5a84310ba17', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kalpesbhai', 'abc@gmail.com', 9925477150, '11731b58db86'),
('b4d5c7044786c3cc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ajitbhai', 'abc@gmail.com', 9377670149, '11731b58db86'),
('b4e267b9e481c8a5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Shreyaben', 'abc@gmail.com', 8401362014, '11731b58db86'),
('b4f9d04b47897732', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vijaybhai', 'abc@gmail.com', 9712928433, '11731b58db86'),
('b6d69f3ad7d4f33c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vaisaliben', 'abc@gmail.com', 9228800220, '11731b58db86'),
('b73a83832d6b', '8b4b3577d4661f0ce820e4082b14843d', 'Conan Price', 'vivek@gmail.com', 9998887776, '035f4d70aceb'),
('b7b6a80941240726', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Lalubhai', 'abc@gmail.com', 9879451300, '11731b58db86'),
('b984744a658a00ab', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Devasisbhai', 'abc@gmail.com', 9998088830, '11731b58db86'),
('b9cad9b5c2cd98ab', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Swetamem', 'abc@gmail.com', 9898012501, '11731b58db86'),
('ba32191f2b315472', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dilipbhai', 'abc@gmail.com', 9974860021, '11731b58db86'),
('baa2ac6b7be08ee8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Umeshbhai', 'abc@gmail.com', 9979204826, '11731b58db86'),
('bac87e9623b422fd', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kevalbhai', 'abc@gmail.com', 8141206644, '11731b58db86'),
('bb1dc85bc5975f6a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritesbhai', 'abc@gmail.com', 9825024420, '11731b58db86'),
('bb4ec12c80af', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Elvis Branch', 'bcd@gmail.com', 1564641846, '49595459e83c'),
('bbeecc469d595d7b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mayurbhai', 'abc@gmail.com', 8888914433, '11731b58db86'),
('bc3c398ef046d570', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ajitbhai', 'abc@gmail.com', 9377670149, '11731b58db86'),
('bc78d12ef9eb08b6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ravibhai', 'abc@gmail.com', 9586762789, '11731b58db86'),
('bd87002d3245a139', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Arvindbhai', 'abc@gmail.com', 9979615639, '11731b58db86'),
('bdb0f01719a8409a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Prathbhai', 'abc@gmail.com', 9824972986, '11731b58db86'),
('be3e002c2acc031b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jayshriben', 'abc@gmail.com', 9428485801, '11731b58db86'),
('be5d5767b001fff5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Arti Mem', 'abc@gmail.com', 7874791172, '11731b58db86'),
('bf9ec78351943cae', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hiteshbhai', 'abc@gmail.com', 9998964594, '11731b58db86'),
('c083db59a3f9f2e2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nilpaben', 'abc@gmail.com', 9979932322, '11731b58db86'),
('c100cb46d25b8075', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Archna Mem', 'abc@gmail.com', 7778000462, '11731b58db86'),
('c10c15d2da64fb1f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sanjaybhai', 'abc@gmail.com', 9925007822, '11731b58db86'),
('c1d861448259c848', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinodbhai', 'abc@gmail.com', 9825804591, '11731b58db86'),
('c212634ea19a8686', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pramodbhai', 'abc@gmail.com', 9979760931, '11731b58db86'),
('c37b64d15ca80177', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sir', 'abc@gmail.com', 9825556742, '11731b58db86'),
('c37bf117d2aded27', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Punam Mem', 'abc@gmail.com', 8460002132, '11731b58db86'),
('c42af1963d614ad4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sanjaybhai', 'abc@gmail.com', 9925007822, '11731b58db86'),
('c475f9b78699dbec', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Khusbumem', 'abc@gmail.com', 8690904047, '11731b58db86'),
('c75eb5de8d0e6e3f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ruchimedam', 'abc@gmail.com', 8401147236, '11731b58db86'),
('c7ab2c24c29aaa54', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vibhumedam', 'abc@gmail.com', 9727000709, '11731b58db86'),
('c7e9ecf93838d04d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Snehalbhai', 'abc@gmail.com', 7622961758, '11731b58db86'),
('ca1352b18cc5e8c2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sudansubhai', 'abc@gmail.com', 9904404308, '11731b58db86'),
('cb6b923c42ed0d4a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sanjaybhai', 'abc@gmail.com', 9825046536, '11731b58db86'),
('cbbc0a7b17ec88c9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Customer', 'abc@gmail.com', 9374727670, '11731b58db86'),
('cd159bc4b73ecba8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Truptimem', 'abc@gmail.com', 8000111847, '11731b58db86'),
('cd20048deb614fb7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pramodbhai', 'abc@gmail.com', 8866245760, '11731b58db86'),
('cde7a084ba135995', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rahulbhai', 'abc@gmail.com', 9725053626, '11731b58db86'),
('cea929d1cf699c1b', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Niravbhai', 'abc@gmail.com', 9909902306, '11731b58db86'),
('ceda006742847c03', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajubhai', 'abc@gmail.com', 9909152454, '11731b58db86'),
('cf3e636ead2f6471', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mitaliben', 'abc@gmail.com', 9909140078, '11731b58db86'),
('cfbbf6a953158a95', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Visnubhai', 'abc@gmail.com', 7891837707, '11731b58db86'),
('cfd9d469f177cfa3', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Montubhai', 'abc@gmail.com', 9979333809, '11731b58db86'),
('d0b417c6fe5876aa', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Divyangbhai', 'abc@gmail.com', 9426446959, '11731b58db86'),
('d23215a6a62ee27c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dipesh', 'abc@gmail.com', 7874243798, '11731b58db86'),
('d381f182a20d7a28', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Diyamem', 'abc@gmail.com', 9537537999, '11731b58db86'),
('d4e04d608cb29d92', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Tapasbhai', 'abc@gmail.com', 8401859998, '11731b58db86'),
('d503371d97a83906', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Devasisbhai', 'abc@gmail.com', 9998088830, '11731b58db86'),
('d5775379a52f6c43', '52a4a8c93ac698d6148f40e3e9f78e2b', 'B Sahu Sir', 'abc@gmail.com', 9909901030, '11731b58db86'),
('d649615508bb22bc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rakesbhai', 'abc@gmail.com', 9825635832, '11731b58db86'),
('d6656e84da7796fa', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Karunamem', 'abc@gmail.com', 9375964843, '11731b58db86'),
('d6a49abf3b666b71', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mahesbhai', 'abc@gmail.com', 9762774036, '11731b58db86'),
('d7869a8d66ab5b58', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vishal', 'abc@gmail.com', 9978441018, '11731b58db86'),
('d7922e9650edd62a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bharatbhai', 'abc@gmail.com', 7405346760, '11731b58db86'),
('d89d616124a58cb9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dharmesbhai', 'abc@gmail.com', 9824575769, '11731b58db86'),
('d8a972d169fdb075', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dikshitbhai', 'abc@gmail.com', 9099156006, '11731b58db86'),
('d91db546de3c7f3e', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rupaben', 'abc@gmail.com', 9825910519, '11731b58db86'),
('d974b853b2a85992', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ishwarbhai', 'abc@gmail.com', 9822240404, '11731b58db86'),
('d981b69918ffaf2c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Premilaben', 'abc@gmail.com', 9537200915, '11731b58db86'),
('dc41f3796e20af95', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pramodbhai', 'abc@gmail.com', 9979760931, '11731b58db86'),
('dc967c9680c0db7f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mitesbhai', 'abc@gmail.com', 9950690891, '11731b58db86'),
('dd57bfafd7e9d0f6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Priyankamem', 'abc@gmail.com', 9924107199, '11731b58db86'),
('dda232c98cb3d407', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nitaben', 'abc@gmail.com', 9426134566, '11731b58db86'),
('ddad4899141c454a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jitendrabhai', 'abc@gmail.com', 9714829859, '11731b58db86'),
('ddc20ecefea723b2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rohitbhai', 'abc@gmail.com', 9913613009, '11731b58db86'),
('de0773a894efa853', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Tusarbhai', 'abc@gmail.com', 9998620720, '11731b58db86'),
('de7e6fdb45233ac8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jitendrabhai', 'abc@gmail.com', 9714829859, '11731b58db86'),
('dea2474187552b27', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rahulbhai', 'abc@gmail.com', 9725053626, '11731b58db86'),
('df148b90936a2239', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Amishbhai', 'abc@gmail.com', 9925352299, '11731b58db86'),
('df21f5efb3b7bf54', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Karunamem', 'abc@gmail.com', 9375964843, '11731b58db86'),
('df3650bfbeba0fb1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vinitbhai', 'abc@gmail.com', 9724939057, '11731b58db86'),
('df3c79311cae3008', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Harsadbhai', 'abc@gmail.com', 8460992846, '11731b58db86'),
('e062bf8368e7d73f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ragavbhai', 'abc@gmail.com', 8000385537, '11731b58db86'),
('e0a59eaf8a3d', '8b4b3577d4661f0ce820e4082b14843d', 'asaa nkbavd', 'asdaskajsdb@gmail.com', 1234323553, '035f4d70aceb'),
('e17082538a3bdcbc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jiteshbhai', 'abc@gmail.com', 9879680004, '11731b58db86'),
('e25ca577115fca41', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ravibhai', 'abc@gmail.com', 9586762789, '11731b58db86'),
('e2b32b9f2083bc04', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Ragavbhai', 'abc@gmail.com', 8000385537, '11731b58db86'),
('e31e41350da371b4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mananbhai', 'abc@gmail.com', 8980916155, '11731b58db86'),
('e44fd1b9edb2738f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Amitamem', 'abc@gmail.com', 9624822345, '11731b58db86'),
('e462ca81541c1af3', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mehulbhai', 'abc@gmail.com', 9825588754, '11731b58db86'),
('e4ff6f6e29396c67', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Amitamem', 'abc@gmail.com', 9624822345, '11731b58db86'),
('e50d1aee76e0a000', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Chandniben', 'abc@gmail.com', 9974416759, '11731b58db86'),
('e5e7306db2d8c463', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bhadresbhai', 'abc@gmail.com', 9727012020, '11731b58db86'),
('e6ec045f0d19b44d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bhadresbhai', 'abc@gmail.com', 9727012020, '11731b58db86'),
('e6fd4a8730d7f6af', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Tirthbhai', 'abc@gmail.com', 9712644430, '11731b58db86'),
('e7234cf5f2e20ba7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dilipbhai', 'abc@gmail.com', 9974860021, '11731b58db86'),
('e75a100361bd', '8b4b3577d4661f0ce820e4082b14843d', 'harsh gajjar', 'abc@gmail.com', 1234323553, '035f4d70aceb'),
('e7e678884ac5c5b9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vatsalbhai', 'abc@gmail.com', 9033857118, '11731b58db86'),
('e8d4c57ce614f7f9', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritesbhai', 'abc@gmail.com', 9998045888, '11731b58db86'),
('e9fc0cfad22ceb59', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sunilbhai', 'abc@gmail.com', 9898006836, '11731b58db86'),
('ea556c3e29a3bf2c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dinesbhai', 'abc@gmail.com', 9909902358, '11731b58db86'),
('eba5c03e961dc1c1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dishamem', 'abc@gmail.com', 9998655044, '11731b58db86'),
('ebacf4e2772ccbf1', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Naresbhai', 'abc@gmail.com', 9825375190, '11731b58db86'),
('ec9a56eb7fcab637', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Juhilbhai', 'abc@gmail.com', 8128111999, '11731b58db86'),
('ed0ec792cf1865b5', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rajbhai', 'abc@gmail.com', 8469696978, '11731b58db86'),
('ed152c96f947fde6', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritesbhai', 'abc@gmail.com', 9925239134, '11731b58db86'),
('ed886a7e13f75827', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Pritesbhai', 'abc@gmail.com', 9825024420, '11731b58db86'),
('edd33de3e0b11152', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sunilbhai', 'abc@gmail.com', 9898006836, '11731b58db86'),
('ef34db4926029e16', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dinesbhai', 'abc@gmail.com', 9909902358, '11731b58db86'),
('f05f2ba276e8a375', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Montubhai', 'abc@gmail.com', 9979333809, '11731b58db86'),
('f065b9693a5240a8', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Bhaktimedam', 'abc@gmail.com', 9275045854, '11731b58db86'),
('f073358bb8c70ded', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Hiteshbhai', 'abc@gmail.com', 9099093043, '11731b58db86'),
('f1a61037e39bb7d0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nitaben', 'abc@gmail.com', 9426134566, '11731b58db86'),
('f1c5b842379d916f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Smitbhai', 'abc@gmail.com', 9662188623, '11731b58db86'),
('f2cb1e36bfcb2a19', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rohitbhai', 'abc@gmail.com', 9913613009, '11731b58db86'),
('f332d23c29b131fc', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Priyankamem', 'abc@gmail.com', 9879103707, '11731b58db86'),
('f3c8c0001e12ee69', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Dr Rathod', 'abc@gmail.com', 9421870206, '11731b58db86'),
('f43ae14cd0916fe0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Sunnybhai', 'abc@gmail.com', 8401562809, '11731b58db86'),
('f59797d3c729df9c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Vimalbhai', 'abc@gmail.com', 9898866464, '11731b58db86'),
('f732842cf6017df7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mukesbhai', 'abc@gmail.com', 9925013268, '11731b58db86'),
('f7e25c5d00795405', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Subhambhai', 'abc@gmail.com', 7600685582, '11731b58db86'),
('f7eaad6045107ee2', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mittumedam', 'abc@gmail.com', 9377128709, '11731b58db86'),
('fa3cbfe2bad7263d', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kamleshbhai', 'abc@gmail.com', 9426137901, '11731b58db86'),
('fb02701994697640', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Rakesbhai', 'abc@gmail.com', 9825635832, '11731b58db86'),
('fc8c737790ef2572', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Akbhai', 'abc@gmail.com', 8238233647, '11731b58db86'),
('fd078975a52545f7', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Nisantbhai', 'abc@gmail.com', 7698003407, '11731b58db86'),
('fd0abf3259f099ed', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Kevalbhai', 'abc@gmail.com', 9662522188, '11731b58db86'),
('fd26fd8a81983ae0', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Mayurbhai', 'abc@gmail.com', 8888914433, '11731b58db86'),
('fd9211df300b94d4', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Divyangbhai', 'abc@gmail.com', 9426446959, '11731b58db86'),
('ff35fac43178068a', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Naresbhai', 'abc@gmail.com', 9879639372, '11731b58db86'),
('ffd541baf2b0693f', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Jitubhai', 'abc@gmail.com', 9925206165, '11731b58db86'),
('ffeefee952d517d3', '52a4a8c93ac698d6148f40e3e9f78e2b', 'Viralbhai', 'abc@gmail.com', 9510510049, '11731b58db86');

-- --------------------------------------------------------

--
-- Table structure for table `contact_channel`
--

CREATE TABLE `contact_channel` (
  `channel_id` varchar(50) NOT NULL,
  `contact_id` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_channel`
--

INSERT INTO `contact_channel` (`channel_id`, `contact_id`, `apikey`, `instance_id`) VALUES
('acb187eb6d80afdb', '000b9371cae7b1ba', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '00319aba0fabb1c4', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '00a26729de6f730f', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '00b356ffc2c07441', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '018956aec4534d34', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '03007b560bfb1f2f', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '03041348ea66372a', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0385f55d19256379', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '03ebe1784e3a4d68', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '040118176e6e2987', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '081e9ae96dc9de97', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '08444091453dd79e', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '08c28cd19fa5c4fe', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '091c923aa2ecc790', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '092320cf1db614b1', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '095053988da44183', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '09e2788e643faa15', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0a72e64f09fdd809', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0aef49cac6308489', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0b3671f38c5dd7a9', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0ca3ef3bccff256f', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0ca4884cd8a987f6', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '0ebec72455678375', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '126df56547a06ca6', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '12c6a5ebb721aa04', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '12e6cd1377e21d66', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('540d7de96c686acb', '1311d0c9723c2095', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '131de3f40482fdba', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '14d3f638b6923ae4', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '1527fb639c168306', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '175468144b1c33b6', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '17cae2a1ac703292', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '1805abccdeef2f7c', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('acb187eb6d80afdb', '1817178dc8d4c18c', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('540d7de96c686acb', '4fa90fc746db0638', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('6de735f6ce0c', '9a9cfdfafbb8', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('6ffb846975ad', '9a9cfdfafbb8', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('ef2540a69028', '9a9cfdfafbb8', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('540d7de96c686acb', 'ad4a9f7d322af543', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('6de735f6ce0c', 'b73a83832d6b', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('6de735f6ce0c', 'e0a59eaf8a3d', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb'),
('6ffb846975ad', 'e75a100361bd', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb');

-- --------------------------------------------------------

--
-- Table structure for table `cstm_template`
--

CREATE TABLE `cstm_template` (
  `cstm_id` varchar(255) NOT NULL,
  `cstm_name` varchar(255) NOT NULL,
  `cstm_msg` varchar(255) NOT NULL,
  `userfields` int(255) NOT NULL,
  `apikey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cstm_template`
--

INSERT INTO `cstm_template` (`cstm_id`, `cstm_name`, `cstm_msg`, `userfields`, `apikey`) VALUES
('afa0a1c1794a', 'Gajjar', '~!@#$%^&*()`1234567890_-+=|\\}]{[:;\"\'<,>.?/+-*/. \n\n[value1]\n[value2]', 2, '52a4a8c93ac698d6148f40e3e9f78e2b'),
('as1215', 'template 3', '333 Prime Arcade,Adajan,Surat\r\n9825957121\r\n-SAPC\r\nhello {}', 1, '8e9f92afd67614646b39ea357e2a1cf6'),
('as123', 'acder', 'ALL NEW SUMMER COLLECTION ARRIVED!\r\n\r\nSHIRT\r\nT-SHIRT\r\nJEANS\r\nCAPRI\r\n\r\nVisit Today\r\n\r\n{}\r\nU-333 Prime Arcade,Adajan,Surat\r\n9825957121\r\n-SAPC', 1, '52a4a8c93ac698d6148f40e3e9f78e2b'),
('as1235', 'template 2', '333 Prime Arcade,Adajan,Surat\r\n9825957121\r\n-SAPC\r\nhello {}', 1, '52a4a8c93ac698d6148f40e3e9f78e2b'),
('c01c77811419', 'abc', 'asd{name}', 12, '52a4a8c93ac698d6148f40e3e9f78e2b');

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `email_id` varchar(50) NOT NULL,
  `from_email` varchar(30) NOT NULL,
  `to_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email_type` varchar(30) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` mediumtext NOT NULL,
  `instance_id` varchar(50) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email`
--

INSERT INTO `email` (`email_id`, `from_email`, `to_email`, `email_type`, `subject`, `message`, `instance_id`, `apikey`, `timestamp`) VALUES
('521c5f498291e5d2', 'sakshiiit232@gmail.com', 'sakshi232innovation@gmail.com', 'bulk', 'hello', 'hello', '1b38a5e20fd0', '8aa24803829cca7b638911159b596080', '2023-05-09 06:48:04');

-- --------------------------------------------------------

--
-- Table structure for table `instance`
--

CREATE TABLE `instance` (
  `instance_id` varchar(50) NOT NULL,
  `i_name` varchar(30) DEFAULT NULL,
  `apikey` varchar(255) NOT NULL,
  `token` varchar(50) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp(),
  `isActive` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instance`
--

INSERT INTO `instance` (`instance_id`, `i_name`, `apikey`, `token`, `create_date`, `isActive`) VALUES
('035f4d70aceb', 'harsh', '8b4b3577d4661f0ce820e4082b14843d', 'a2aa4c9a99a6aca55915', '2023-04-03', 0),
('04905a89f9b9', 'aaaaaaaa', '8b4b3577d4661f0ce820e4082b14843d', '00e27a50a99549ca91e8', '2023-05-03', 0),
('0a8073f093bb', 'test 1', '8b4b3577d4661f0ce820e4082b14843d', '69b1767c94b602ca', '2023-01-28', 0),
('11731b58db86', 'test 7', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-04-25', 1),
('1849a5266cce', 'qwert', '623a67ec8d223c63b94757a02be0c206', '343feb3fcd01fd376d06', '2023-02-28', 0),
('2deea8241267', 'test 4', '623a67ec8d223c63b94757a02be0c206', '97382f42fb7e493975ff', '2023-02-28', 0),
('2f83e88b2b34', 'test 3', '8b4b3577d4661f0ce820e4082b14843d', '13aec37c7fbef80f', '2023-01-28', 0),
('49595459e83c', 'v', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-04-24', 0),
('6a0d2f023c0e', 'test 7', '87ec67c80086e00d95c4e38396e5d67c', 'e5949026e32ded5e83bc', '2023-02-03', 0),
('816092a3e6ca', 'test 1 ', '87ec67c80086e00d95c4e38396e5d67c', '917af3c2a605d85940e3', '2023-02-28', 0),
('853aeb412fa6', 'a', '87ec67c80086e00d95c4e38396e5d67c', 'd9429c5a408b57f54626', '2023-04-11', 0),
('bf88906cc243', 'test 4', '8b4b3577d4661f0ce820e4082b14843d', '56c118df06aa9214', '2023-02-04', 0),
('d170624c80b6', 'asd', '8b4b3577d4661f0ce820e4082b14843d', '0640de86561e76315a7a', '2023-05-03', 0),
('daf5f8b0d07d', 'asf', '87ec67c80086e00d95c4e38396e5d67c', 'd0dbb522d9db8d68', '2023-02-07', 0),
('f700d8f37f27', 'test 4', '52a4a8c93ac698d6148f40e3e9f78e2b', '06d8308b0d53cacadce8', '2023-05-06', 0),
('f730cdd15a56', 'test 4', '87ec67c80086e00d95c4e38396e5d67c', '1d0d636692410ae0', '2023-01-28', 0),
('f8ff0e43303b', 'aa', '8b4b3577d4661f0ce820e4082b14843d', '3845b12bc104fc7945f3', '2023-05-03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `msgid` varchar(50) NOT NULL,
  `msg` text NOT NULL,
  `msg_type` varchar(20) NOT NULL,
  `receiver` varchar(20) NOT NULL,
  `instance_id` varchar(50) NOT NULL,
  `apikey` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`msgid`, `msg`, `msg_type`, `receiver`, `instance_id`, `apikey`, `token`, `time`) VALUES
('001f11d1704c297b', 'hello QIT MEMBERS', 'bulk through channel', '919313472227@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:26:49'),
('00731bc34a1b10ed', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919825046536@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('00bf657ee95667db', 'hi harsh i am harsh', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 11:20:00'),
('016bdd80989b546f', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:39:00'),
('019e4aa2cfb4e44d', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:54:00'),
('03207ab502d0f423', 'qit', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:48:38'),
('032ae252b8e0f611', 'hello QIT member', 'bulk through channel', '919978339401@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('03ae528351e62b77', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919825804591@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('044430583b28a614', 'hello QIT MEMBERS', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:26:49'),
('0515610d9da8b74e', 'hi harsh i am harsh', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 17:11:21'),
('05a8a14a36679d64', 'hello', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 16:37:15'),
('087c6ed2182aaaa2', 'message 1', 'bulk through channel', '916353131872@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:56:55'),
('087e6e9c10d18db2', 'hello', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 18:00:10'),
('088bca59b4877dfd', 'message 1', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:59:00'),
('092a5d6e12740981', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919558867467@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('0aa88e84f55b4ad4', 'abc', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:56:00'),
('0acc735ab233dfd8', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:35:27'),
('0b4bffc47ad48c56', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919924107199@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('0b95b8682b333f60', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683472073/M3/browi8p5kbbbmdr6tdqo.gif', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:37:53'),
('104d13088f742132', 'send to SAKSHI & POOJAN', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:04:23'),
('10745efcb0ea41ae', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683793992/M3/fvhrw5me5o5sg9gyvzjh.gif', 'image/gif', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:03:13'),
('1169ed0a49989dcc', 'hello', 'custom_bulk', '917624032023@c.us', '035f4d70aceb', '8b4b3577d4661f0ce820e4082b14843d', '035f4d70aceb', '2023-05-03 12:11:07'),
('12a2e5e801b84888', 'a', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:33:54'),
('131f392ac1ce20a9', 'hello QIT member', 'bulk through channel', '916353131872@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('13deac8cb74926d9', 'message 1', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('14fcea1a1f98da17', 'hi harsh i am harsh', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:20:55'),
('15f6af45b83f8a67', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919408885700@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('15ff60c046458b41', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919727000709@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('161d9163cb88bb38', 'message 1', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:52:00'),
('164252c12d1153ca', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919429857932@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('167085b2642950c2', 'undefined', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 14:29:00'),
('17a9cb3934e125b2', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:41:57'),
('17ad258a38c77375', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919377128709@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('18326e9486066df3', 'You made a purchase for harsh using a credit card ending in 106.style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"style=\"height: 210px; word-wrap: break-word;\"', 'template_bulk', '919601376471@c.us', '035f4d70aceb', '8b4b3577d4661f0ce820e4082b14843d', '13fec0fbbd767f657632', '2023-05-04 14:29:57'),
('186f26285aa0bf88', 'fees.docx', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 21:01:57'),
('1a677d44e3242b52', 'asd', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-15 18:08:00'),
('1b0044a14e3e876f', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919375111670@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('1b64c3481ccf8914', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919558867467@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('1c1c0a802471d653', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683471625/M3/sxog0brehuepazcfzo8l.png', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:30:26'),
('1c686bafe5d54644', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919824972986@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('1cc89e39442b1f8f', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 12:08:20'),
('1d9e553aa06993ba', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683472148/M3/opauweznszqp7cajdxnv.png', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:39:08'),
('1df63e52bae62739', 'hi harsh i am harsh', 'msg', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 17:32:18'),
('1fb27450b145cfe0', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 14:17:05'),
('1fcb79dd80549773', 'harry potter', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-07 12:57:55'),
('20423c6568f07bd6', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683471180/M3/ehm9g3naxy3oww0vd4yl.jpg', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:23:00'),
('20c3070bd6a92c67', 'message 1', 'bulk through channel', '919313472227@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:56:55'),
('20e56c9d0a42da00', 'message 1', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('2182edc7e1154fb1', 'message 1', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('22819dc243bea4d7', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:37:37'),
('23ec8d3fd28281aa', 'hello QIT member', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('26041241818dc0ec', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:54:20'),
('26e0756ee571d6d1', 'hi harsh i am harsh', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 14:38:01'),
('2938374780d18e90', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683473793/M3/ddih8xoorstrivg4olw8.gif', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 21:06:33'),
('2a412ed8718b8804', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919825368754@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('2c7e2cf73b9a6148', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 14:08:52'),
('2dd31c2f2f1233b8', 'hello', 'Single Message', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-17 12:15:55'),
('2f525bd1dfaee58e', 'send to all QIT MEMBERS', 'bulk through channel', '916353131872@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:03:53'),
('2fc9472afc11b894', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683460985/M3/ldz8bijzdxnesolaupct.jpg', 'image', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-07 17:33:05'),
('2fe849cf522bee42', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:18:13'),
('32134d749f4ee6bd', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919662802517@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('3301e59c51882b7a', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 12:19:26'),
('33b1624929144425', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:44:56'),
('345acd683d18d2c5', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:18:13'),
('36d2ad1b1a0796a1', 'hello', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:21:17'),
('3748cba33c80322a', 'message 1', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('38236e12032a27aa', 'hello QIT MEMBERS', 'bulk through channel', '916353131872@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:26:49'),
('38f235b59d030bb0', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:48:35'),
('39f31d8705b7f21c', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 12:03:38'),
('3a4321bba01b8cf4', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:41:57'),
('3a8be3ef997cafe9', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683472788/M3/dxvjlqowqbckibpz4gnn.pdf', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:49:48'),
('3db91520f7222f15', 'imag 6e sample', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:35:55'),
('3fa7135c858495e0', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:46:00'),
('40606de2064d8281', 'message 1', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('407cfd9fe96c0a47', 'harry potter', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 16:49:33'),
('4089421f643fb9d1', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:41:47'),
('41120ea4e9ac7cce', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:35:01'),
('42762a1eb4e2550e', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:40:32'),
('45a301759fb957ca', 'hi harsh i am harsh', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:32:52'),
('46169ffdb57a7275', 'send to all QIT MEMBERS', 'bulk through channel', '919313472227@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:03:53'),
('474b52e269c12a7d', 'GeekforGeeks goals.xlsx', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 21:01:23'),
('4878711b45f8624c', 'Assignment2_java.zip', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 21:03:15'),
('48da5da90947a927', 'message 1', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:56:55'),
('493038a70f447036', 'hello QIT member', 'bulk through channel', '919313472227@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('49cf23c9c0519b68', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '918238233647@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('4f32bd88f90bfe49', 'message 1', 'bulk through channel', '919978339401@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:56:55'),
('51d0d0589d7487e5', 'hello QIT member', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('5250977fab1f01c2', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:26:56'),
('53bbcc05c3b1a631', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 12:04:20'),
('53e51b1895f439ad', 'message 2', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:53:00'),
('56e23b87b35336cd', 'hi harsh i am harsh', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 16:29:36'),
('58d7d8841fe1bdd3', 'hello', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 16:43:43'),
('5b165f31d4137f01', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 16:48:51'),
('5e5ba2c9704e0bb1', 'sd', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:36:44'),
('5f21335332d27267', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:15:35'),
('5fd68c8748fc87b0', 'ac', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:34:19'),
('62620e810825d41a', 'aaa', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:37:15'),
('6460b927d6eb61a7', 'message 1', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:56:55'),
('646d1f55d13d1871', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683472517/M3/wn0w72xv1rolg2dx54qe.jpg', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:45:17'),
('64c5589b1137ac9f', 'message 1', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:56:55'),
('67f9051f76ac668c', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:51:11'),
('6aab29d87c0184ac', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683611691/M3/b9wnm0fa05lzkayskast.png', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 11:24:53'),
('6bc24ddf0bf5acde', 'hello 2', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-15 18:12:00'),
('6c32495f4fba3755', 'hello QIT member', 'bulk through channel', '919313472227@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:52:38'),
('6de6ccc3b1c74645', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683972578/M3/c2bl0t1pdiztoa1d9rfd.jpg', 'image/jpeg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:39:39'),
('6efb94aec4a4439d', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919737592897@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('6f1f158c2c288f0c', 'message 1', 'bulk through channel', '919978339401@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('709496c025b4da25', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919879394205@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('70cc1bf00f9f2a11', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:53:55'),
('70e2d8732a619854', 'new msg', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:40:16'),
('72742feef85d0d5f', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919421870206@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('73736ce9803a91ff', 'qit', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:48:38'),
('77afb39d541be31e', 'dbo.userTB.sql', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:58:15'),
('799d6d9b5fd5657e', 'hello QIT member', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:52:38'),
('79b643c4956b32cf', 'hello my name is harsh', 'Bulk Message channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:40:07'),
('7a771ec08657d3cb', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919979615639@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:11'),
('7a80578b3feb91b8', 'hi harsh i am harsh', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-15 11:57:00'),
('7d01a1031f899acf', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:54:25'),
('7e8129216b4064eb', 'hello QIT member', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:52:38'),
('7f034ca6802954cc', 'hello QIT member', 'bulk through channel', '919978339401@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:52:38'),
('8161af3b9d4507d1', 'hi harsh i am harsh', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 16:22:10'),
('819e776ec155ad24', 'hello 1', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-15 18:12:00'),
('84b2c05aebcb20ae', 'asdfg', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:35:16'),
('857ce3d41f329dc7', 'imag 6e sample', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 14:08:33'),
('8582595d89638c45', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:54:15'),
('85fc1b5ba9cb7f24', 'hello', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:34:02'),
('8616d1e07aafdf8e', 'hello QIT member', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('865b808a643cf71e', 'harry potter', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 11:38:12'),
('87ab368321ad5117', 'new msg', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:40:16'),
('87efb7df64c02cc8', 'hello my name is harsh', 'Bulk Message channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:40:07'),
('8a54551b39a1212e', 'harry potter', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 12:22:39'),
('8afe4ca3327a964f', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:48:00'),
('8c51a5d5e4cbb957', 'hi harsh i am harsh', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 17:46:09'),
('8f6d08b720a9849a', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683460850/M3/tntd1nc8u02mmy2n2tmg.jpg', 'image', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-07 17:30:50'),
('908d082e95b7db74', 'hello QIT member', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('90af4eb248ee57ae', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683961717/M3/awfetkcobjt1fyhg7uus.jpg', 'image/jpeg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 12:38:39'),
('91a832e543f29569', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:25:12'),
('92261a6bbda956e9', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683471436/M3/ug6jbunfvbf0nnwbiy3l.png', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:27:16'),
('9251696b4670cfc8', 'ssssawes', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 16:33:45'),
('933b93288114badf', 'hi harsh i am harsh', 'Single Message', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-11 12:01:22'),
('942d91831f291d32', 'imag 6e sample', 'image', '919879296316@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 14:13:28'),
('965f72b694963fab', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:54:10'),
('9a47869f39966864', 'qrdb 8-5.sql', 'application/octet-st', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-11 12:08:31'),
('9aacbbc7828b2b9f', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919909663817@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('9bf0125dc879cd7c', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683472451/M3/urq2ssikojrdvmseg284.jpg', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:44:11'),
('9de28908730dddf8', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919824882958@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('a0f75a5b0b25aa9e', 'new msg', 'bulk through channel', '919601376471@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:40:16'),
('a18c435ae95251c9', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:40:00'),
('a1ee3dccc4d1414c', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919429857932@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('a2ff95f4688fd34c', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683471976/M3/ufhxqbq9dlcs22gbdddi.png', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:36:16'),
('a301d86876272038', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:25:01'),
('a42dcb800fa5996a', 'harry potter', 'Single Message', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-11 12:13:55'),
('a4eba0813c18d769', 'imag 6e sample', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:43:07'),
('a5d0b6db0ddef6aa', 'harry potter', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:37:00'),
('a795bf871a9bf275', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:40:32'),
('a981974261fc5600', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:35:01'),
('aafe6aeb7d2c0073', 'message 1', 'bulk through channel', '919313472227@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('abf436137808d7e3', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919662188623@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('ac403380db1e58af', 'hello QIT member', 'bulk through channel', '916353131872@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:52:38'),
('ac8d19190ad0cccf', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:40:32'),
('ac8d64b151646ad4', 'hello QIT member', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:52:38'),
('acee13f451411d16', 'zxc', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:46:13'),
('ae7f84cabef7cda0', 'message 2', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:59:00'),
('aea32454d4e4a0d8', 'message 1', 'bulk through channel', '916353131872@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:57:09'),
('af2270ca42332774', 'hello QIT MEMBERS', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:26:49'),
('af9bb2409c71515b', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '918690904047@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('b1ae25e9502981c0', 'asdfg', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:35:16'),
('b1ffb5bd0662acea', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 18:14:05'),
('b275d8fc63bfcbfa', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919825444200@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('b2f5c209dd95cf6d', 'send to all QIT MEMBERS', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:03:53'),
('b36d027677393f78', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683472198/M3/zgspsaxk6bdueeuxlntu.jpg', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:39:59'),
('b45768eebd115c2c', 'imag 6e sample', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 14:33:08'),
('b4c11b6fe2eeb4da', 'send to all QIT MEMBERS', 'bulk through channel', '919978339401@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:03:53'),
('b4f50aff54fe8a54', 'sheetdata.csv', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 21:02:35'),
('b711ece9f43f9365', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:25:01'),
('b878c02beeb6f62b', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:41:57'),
('b8f2ba455d102163', 'hello', 'Schedule Single Mess', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-17 12:17:00'),
('bf6560bd015bca2d', 'hello', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:54:05'),
('c0d255875e40ce12', 'undefined', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 14:25:00'),
('c14eb18da985a58f', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919426872428@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('c15892d58cd0651f', 'email (1).sql', 'application/octet-st', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 18:22:59'),
('c18f16cc0e4af95c', 'hello harsh', 'msg', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-07 12:59:34'),
('c1aeb8052f52c7f3', 'asdfnm', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:32:21'),
('c38f41822402a3d6', 'undefined', 'message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 14:32:00'),
('c7b59bdf4dba4cf4', 'hi harsh i am harsh a time 6e timapass karvano', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 17:43:24'),
('c852e6beea6b6685', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:32:42'),
('c92eec76a0c4fc3a', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683793961/M3/zgqy8b3q36gkvh9kuco3.jpg', 'image/jpeg', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:02:43'),
('c94553a91df325ea', 'hi harsh i am harsh', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:32:00'),
('cb37d5bfd75e82dc', 'hello my name is harsh', 'Bulk Message channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-13 15:40:07'),
('cbaf75ffbfef0e71', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919909152454@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('cc2e659b8285209d', 'harry potter', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 11:30:01'),
('cf91d97518f47cec', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '917622961758@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('d04ee4a10c4ce0a0', 'https://res.cloudinary.com/do6cd8c3p/image/upload/v1683473223/M3/prhhsoufdpfuvfri16ni.gif', 'image', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 20:57:04'),
('d2d9e8f63c9108cf', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:25:01'),
('d8269e6f71cc3e73', 'hello 1', 'Schedule Single Mess', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-16 10:57:15'),
('d86fc6c2069e9b8b', 'hi harsh i am harsh', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 14:52:00'),
('da7efd991a3a8165', 'hello QIT member', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:53:00'),
('dad0f4c8e4b83870', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:18:13'),
('dbaa4fa3d7c719eb', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:26:56'),
('dc5f1edcc90da5c4', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919099232066@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('dcdc20d55528b27d', 'send to SAKSHI & POOJAN', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:04:23'),
('ddfa4007f9b6792e', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:37:37'),
('de6cd8f0f5b1be01', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:26:56'),
('decd0ec9a67bb619', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919879058595@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('df1761eba2b1f765', 'asd', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:42:51'),
('e1803f67b5e59fae', 'hello QIT MEMBERS', 'bulk through channel', '919978339401@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:26:49'),
('e2f7b4e039b2aed2', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919173027358@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('e3281c952470437a', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919724939057@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:13'),
('e724b3bedbe72a23', 'asd', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:42:51'),
('e72d84b570f90428', 'hi', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 16:34:18'),
('e7afc9f719456887', 'hello QIT MEMBERS', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:26:49'),
('ec6e0fdf6a19a3ed', '11 39 0001 ', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 23:40:10'),
('ef0070c66a25b28c', 'imag 6e sample', 'image', '91undefined@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 13:31:03'),
('f04510294ff882c3', '', 'msg', '91@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-07 16:26:04'),
('f08d4f5830568f3e', 'harry potter', 'Single Message', '918320729231@c.us', '49595459e83c', '52a4a8c93ac698d6148f40e3e9f78e2b', 'ba7d1e33bc5dfa53950b', '2023-05-11 15:03:00'),
('f0d36d25d3ac75a6', 'new msg', 'bulk through channel', '917624032023@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:40:16'),
('f228354c78ec6d27', '????????  ????????  ????????  >?#$%  ^&%$#AS  .+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000  ~~~~~~!@#$%^&*()', 'Single Message', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:34:43'),
('f44f210a243aab35', '????????\n\n????????\n\n????????\n\n>?#$%\n\n^&%$#AS\n\n.+-*/<>,.:;\"\'?/|\\}}]{[+=_- )(`123456789000000000000\n\n~~~~~~!@#$%^&*()', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-10 17:37:37'),
('f6400d7c9bcd4a84', 'zxc', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 14:46:13'),
('f6cb210756d869d8', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '917383258964@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12'),
('f6eb9a75c69b9957', 'send to all QIT MEMBERS', 'bulk through channel', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:03:53'),
('f71bac97801b5991', 'send to all QIT MEMBERS', 'bulk through channel', '919313054702@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 15:03:53'),
('f93e136c26dec66a', 'harry potter', 'msg', '918320729231@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-06 17:43:55'),
('fbde94f15195bd84', '', 'msg', '91@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '186f30e3f7f27ba38f7e', '2023-05-07 12:55:23'),
('fd55bc3eab6359bd', 'ALL NEW SUMMER COLLECTION ARRIVED  SHIRT TSHIRT JEANS CAPRI  Men4u Boutique U333 Prime Arcade Adajan Surat 9825957121', 'bulk through channel', '919913748773@c.us', '11731b58db86', '52a4a8c93ac698d6148f40e3e9f78e2b', '8835d812fcbbde290574', '2023-05-09 16:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `planid` int(11) NOT NULL,
  `pname` varchar(40) NOT NULL,
  `price` int(11) NOT NULL,
  `durationMonth` int(11) NOT NULL,
  `totalInstance` int(11) NOT NULL,
  `totalMessage` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `plan_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`planid`, `pname`, `price`, `durationMonth`, `totalInstance`, `totalMessage`, `discount`, `plan_type`) VALUES
(101, 'Basic', 0, 1, 1, 500, 0, 'Monthly'),
(102, 'Standard', 1000, 1, 10, 5000, 0, 'Monthly'),
(103, 'Premium', 2000, 1, 50, 12500, 0, 'Monthly'),
(104, 'Standard', 10000, 12, 120, 60000, 17, 'Yearly'),
(105, 'Premium', 20000, 12, 300, 150000, 17, 'Yearly');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  `time` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `data`, `time`, `status`, `apikey`, `instance_id`) VALUES
('sh_077c68e8b6c0', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9879879872\"]}', '45 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_0ca472e7353d', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '23 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_0f181c31460e', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '48 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_11abd8310757', 'ABC', '25 12 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_11bf3668ef95', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '22 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_157b2ca534c0', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '23 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_167b88231ed7', '{\"api\":\"/sendmsg\",\"body\":\"ad\",\"contacts\":[\"9998887775\"]}', '27 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_1fe9724cb483', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '51 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_2d625f4974d3', '{\"api\":\"/sendmsg\",\"body\":\"asd\",\"contacts\":[\"8320729231\"]}', '52 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_30e6b5cb86ec', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"8320729231\"]}', '21 18 16 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_322215cc0cd9', '{\"api\":\"/sendmsg\",\"body\":\"\",\"contacts\":[\"\"]}', '27 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_388d2d77f571', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '56 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_3893feef547b', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '19 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_3e775d97e74c', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '23 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_466e1d33c140', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9999999999\"]}', '7 12 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_4994e4b5e1ee', '{\"api\":\"/sendmsg\",\"body\":\"\",\"contacts\":[\"\"]}', '27 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_4e4ac698c9a7', '{\"api\":\"/sendmsg\",\"body\":\"hello\",\"contacts\":[\"9313054702\"]}', '21 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_5635347042ac', '{\"api\":\"/sendmsg\",\"body\":\"Hello 16 : 41\",\"contacts\":[\"8320729231\"]}', '45 17 16 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_5b9860a37f71', '{\"api\":\"/sendmsg\",\"body\":\"Hello 16 : 39\",\"contacts\":[\"8320729231\"]}', '38 17 16 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_6016fbcc3ae6', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9999999999\"]}', '25 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_6363e6db253e', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '45 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_65f20c5a3dc8', '{\"api\":\"/sendmsg\",\"body\":\"hello\",\"contacts\":[\"9313054702\"]}', '24 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_69b3284e0789', '{\"api\":\"/sendmsg\",\"body\":\"Hello 16 : 40\",\"contacts\":[\"8320729231\"]}', '39 17 16 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_6be5c953a729', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '55 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_737780247e73', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"8320729231\"]}', '51 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_76243d60e456', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '40 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_984bad4bf1ab', '{\"api\":\"/sendmsg\",\"body\":\"hello\",\"contacts\":[\"9313054702\"]}', '17 12 17 5 *', 'DONE', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_9d5eba84681d', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9998887775\"]}', '27 13 16 5 *', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_ae047773b82e', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '22 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_ae220b24f3b8', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '22 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_b09f3fe1f8ed', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '23 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_bb8123503dfb', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '46 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_cc77e7fc8e37', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '22 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_d28589a42031', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '19 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_d4935ed51efc', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '56 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_d966d5c54805', '{\"api\":\"/sendmsg\",\"body\":\"harry potter\",\"contacts\":[\"9313054702\"]}', '39 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_df907acb98a2', '{\"api\":\"/sendmsg\",\"body\":\"Hello 14 : 35\",\"contacts\":[\"8320729231\"]}', '29 15 16 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_e100d1f43425', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '19 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_e4c80d65c42a', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '22 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_e61eadd43f96', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '58 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_f52691c0abc4', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '53 11 17 5 * ', 'PENDING', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86'),
('sh_f905c3aad9b1', '{\"api\":\"/sendmsg\",\"body\":\"hi harsh i am harsh\",\"contacts\":[\"9313054702\"]}', '26 12 17 5 *', 'ERROR', '52a4a8c93ac698d6148f40e3e9f78e2b', '11731b58db86');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `subID` varchar(20) NOT NULL,
  `planID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `apikey` varchar(50) NOT NULL,
  `paymentID` varchar(50) NOT NULL,
  `orderID` varchar(50) NOT NULL,
  `pay_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`subID`, `planID`, `amount`, `apikey`, `paymentID`, `orderID`, `pay_date`) VALUES
('0a3a7ce43e26badb8e1c', 103, 3, '52a4a8c93ac698d6148f40e3e9f78e2b', 'pay_Lhzi93YYGOkOHo', 'order_Lhzhx0O8CoPBTZ', '2023-05-25'),
('117c434f9bb383834239', 103, 5, '87ec67c80086e00d95c4e38396e5d67c', 'pay_LcCeDfoCf6Fr5m', 'order_LcCe5OuJp0IdtT', '2023-04-11'),
('18f12f3afc7132b2e7ba', 103, 1000, '87ec67c80086e00d95c4e38396e5d67c', 'pay_LamzPfkiqvTekS', 'order_Lamz8OaeU4bwVB', '2023-03-10'),
('68070f3822ea3876e667', 103, 2000, '87ec67c80086e00d95c4e38396e5d67c', 'pay_Lan82JtnAEeoln', 'order_Lan7VSCdwOLYqr', '2023-01-07'),
('b928a0e8565010e40703', 102, 1, '87ec67c80086e00d95c4e38396e5d67c', 'pay_LanAQqfWSBNspS', 'order_LanAICtUbLbn5Q', '2023-01-07'),
('dd99721d822323418b25', 102, 1000, '8b4b3577d4661f0ce820e4082b14843d', 'pay_La58eGfO5nCuak', 'order_La57ujlYMxTbo6', '2023-08-05'),
('dd99721d822323418b45', 102, 1000, '8b4b3577d4661f0ce820e4082b14843d', 'pay_La58eGfO5nCuak', 'order_La57ujlYMxTbo6', '2023-06-05'),
('dd99721d822323418bf3', 102, 1000, '8b4b3577d4661f0ce820e4082b14843d', 'pay_La58eGfO5nCuak', 'order_La57ujlYMxTbo6', '2023-04-05');

-- --------------------------------------------------------

--
-- Table structure for table `support_agents`
--

CREATE TABLE `support_agents` (
  `agent_id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_agents`
--

INSERT INTO `support_agents` (`agent_id`, `name`, `email`, `password`, `category`) VALUES
(1, 'poojan', '20bmiit087@gmail.com', 'poojan@123', 'Account Management'),
(2, 'sakshi', 'sakshi232innovation@gmail.com', 'sakshi@123', 'Technical Support'),
(3, 'harsh', 'hpgh048@gmail.com', '$2b$10$IdWV2C55XmE5vWybIFGO7.Njmqbp4.22.mcJlS6YTJln7Ndh6IyrW', 'Payment Problem'),
(4, 'vivek', 'lazypandas2022@gmail.com', 'vivek@123', 'Service Inquiry'),
(5, 'radhi', 'sakshiiit232@gmail.com', 'iit@123', 'Feedback and Suggestions');

-- --------------------------------------------------------

--
-- Table structure for table `support_ticket`
--

CREATE TABLE `support_ticket` (
  `ticket_id` varchar(50) NOT NULL,
  `client_id` varchar(10) NOT NULL,
  `category` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `t_subject` varchar(100) NOT NULL,
  `t_type` varchar(50) NOT NULL,
  `t_description` mediumtext NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'open',
  `generation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `apikey` varchar(255) NOT NULL,
  `agent_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_ticket`
--

INSERT INTO `support_ticket` (`ticket_id`, `client_id`, `category`, `user`, `t_subject`, `t_type`, `t_description`, `status`, `generation_time`, `apikey`, `agent_email`) VALUES
('1651', 'sadfghj', 'email', 'maxnoah1143@gmail.com', 'dasdas', 'Payment Problem', 'asdf', 'inprogress', '2023-05-12 11:37:26', '52a4a8c93ac698d6148f40e3e9f78e2b', 'hpgh048@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `temp_id` int(255) NOT NULL,
  `temp_name` varchar(255) NOT NULL,
  `temp_message` longtext NOT NULL,
  `userfields` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`temp_id`, `temp_name`, `temp_message`, `userfields`) VALUES
(1, 'reminder', 'You made a purchase for [value1] using a credit card ending in [value2].', 2),
(2, 'newLaunch1', 'Hey [value1] the wait is finally over! We know you wanted you to be the first to hear about our spring collection Check it out here! [value2].\n', 2),
(3, 'newLaunch2', 'What’s hip, hot and sure to sell out fast? That’s right, [value1], the [value2] spring collection is here 👚 👟 You wanted to be the first to hear about it, so update your workout wardrobe now at [value3]!', 3),
(4, 'restocked item 1', 'Hi [value1], the [value2] you wanted is now back by popular demand 🥳 To thank you for waiting, we’re offering you free delivery for purchases of above [value3]. Grab it now at [value4]!', 4),
(5, 'restocked item 2', 'As promised, [value1], you’re the first to know that [value2] is back in stock 🥳 Get it immediately at [value3] or visit any of our retail outlets 🏢 We’re located at: [value4]. Let us know if we can reserve one in-store for you!', 4),
(6, 'sales and promotion item 1', 'New Promotion 🛎️ This month’s special offer is [value1]. We’re also offering loyal customers like you, [value2], a 5% discount on orders above [value3]. Use the promo code DISCOUNT5. Order now at [value4].', 4),
(7, 'sales and promotion item 2', 'Hi [value1]! We’ve got a hot 🔥 tip for you: Grab this month’s special promotion of [value2] immediately. This is limited to the first [value3] customers, so be quick! Shop now 🛒 at [value4].[value5]', 5),
(8, 'loyalty rewards 1', 'Hi [value1], our new product drop goes live at [value2] tomorrow and we wanted you to have first access 🥳 The [value3] is a limited release so let us know if you would like us to put one aside for you. Reserve yours quickly!', 3),
(9, 'loyalty rewards 2', 'Dear [value1], thank you for being a loyal member of [value2] 🙏 Here’s an exclusive 10% off our new collection with the promo code 10TQ. There’s also a free gift 🎁 for orders above [value3] as a token of our appreciation. Shop now at [value4].', 4),
(10, 're-engagement 1', 'It’s been a while, [value1] 👋 Since your last visit, we have expanded our products and services to provide the best wellness experience around. Why not drop by for a yoga 🧘 class or a matcha 🍵 tasting session? Reserve your workshop of choice at [value2]. We hope to see you!', 2),
(11, 're-engagement 2', 'Hi [value1]! We miss you at [value2], so we’d like to offer you an exclusive 8% off storewide 🥳 Browse through our latest products at [value3] and apply the code YAY8OFF at check-out 🛒.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `ticket_reply`
--

CREATE TABLE `ticket_reply` (
  `index_no` int(255) NOT NULL,
  `identity` varchar(20) NOT NULL,
  `ticket_id` varchar(50) NOT NULL,
  `reply` mediumtext NOT NULL,
  `reply_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_reply`
--

INSERT INTO `ticket_reply` (`index_no`, `identity`, `ticket_id`, `reply`, `reply_time`) VALUES
(0, '', '1651', 'hi hrlo', '2023-05-12 11:58:25'),
(0, 'client', 'ST-229IB', 'hiiiiii', '2023-05-06 07:50:16'),
(0, 'Support Agent', 'ST-229IB', 'hiii', '2023-05-06 07:32:31'),
(1, 'Support Agent', 'ST-229IB', 'helooo', '2023-05-06 07:32:44'),
(2, 'Support Agent', 'ST-229IB', 'chasl', '2023-05-06 07:32:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `apikey` varchar(255) NOT NULL,
  `uname` varchar(255) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `phoneverify` tinyint(1) NOT NULL DEFAULT 0,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `registrationDate` date NOT NULL DEFAULT current_timestamp(),
  `image` varchar(300) DEFAULT NULL,
  `emailpasscode` varchar(50) NOT NULL,
  `hostname` varchar(100) NOT NULL DEFAULT 'smtp.gmail.com',
  `port` bigint(20) NOT NULL DEFAULT 465
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`apikey`, `uname`, `email`, `password`, `phone`, `phoneverify`, `country`, `state`, `city`, `registrationDate`, `image`, `emailpasscode`, `hostname`, `port`) VALUES
('1d2457174d1c9606fc98c5294f5283cf', 'abcd', 'abcd@gmail.com', 'as@Qde234', 1234567890, 0, '', '', '', '2023-04-03', '', '', 'smtp.gmail.com', 465),
('2c15c40862110afdff78eafa1f9e5899', 'Carla Rosario', 'mycuhor@mailinator.com', 'Pa$$w0rd!', 2147483647, 0, 'ALBANIA', 'QARKU I DURRESIT', 'DURRES', '2023-04-03', '', '', 'smtp.gmail.com', 465),
('3218fe07d468d5a42498754a6f5dd80f', '022_Harsh Gajjar', 'harshgajjar.mscit20@vnsgu.ac.i', '', NULL, 0, '', '', '', '2023-04-27', 'https://lh3.googleusercontent.com/a/AGNmyxY5ONPb84WYrse9nUwYYM7Olw4rtZo0z7gNxPnCpw=s96-c', '', 'smtp.gmail.com', 465),
('33a86c91b4f26bdd4c3b37bdbbdb2430', 'Azalia Macdonald', 'mubesida@mailinator.com', 'Pa$$w0rd!', 9611589648, 0, 'BERMUDA', 'SANDYS PARISH', '', '2023-04-03', '', '', 'smtp.gmail.com', 465),
('478fa2f0b4994216f06f183c010bcab7', 'abcxyz', 'sakshi232innovation@gmail.com', 'pwd123@S', 2147483647, 0, '', '', '', '2023-04-03', '', '', 'smtp.gmail.com', 465),
('52a4a8c93ac698d6148f40e3e9f78e2b', 'MAX', 'maxnoah1143@gmail.com', '$2b$10$jAWNv65iTmQylvQXkeTp/.dwE7WYENdCVDWoZDIJ6x5Q2m5vk1UgO', 7859658963, 0, 'Azerbaijan', 'Gadabay Rayon', '', '2023-04-24', NULL, 'asd5351as', 'smtp.gmail.com', 465),
('623a67ec8d223c63b94757a02be0c206', 'Harsh Gajjar', 'gajjarharah1104@gmail.com', '', NULL, 0, '', '', '', '2023-04-03', 'gajjarharah1104@gmail.com', '', 'smtp.gmail.com', 465),
('6bb79635ecfe1be36e9c9980c1da9a3d', 'sakshi', 'sakshi@gmail.com', 'Abcd#1234', 7624032023, 1, 'INDIA', '', '', '2023-04-03', 'sadie5.png', '', 'smtp.gmail.com', 465),
('6d2942ad5a9020aa1c7db957e108ce63', 'sdas', 'abc@gmail.com', '$2b$10$nT8jexq7IoxVWNTVhN9JEeq97s7bv7bkHpPcknOgljgsRSCT2F/lS', 7843568431, 0, 'Andorra', 'Canillo', '', '2023-04-24', NULL, '', 'smtp.gmail.com', 465),
('7dc9bfc4dfd4b763acef2492dbc95256', 'Admin', 'admin@gmail.com', 'Admin123', 7589625689, 0, '', '', '', '2023-04-03', '', '', 'smtp.gmail.com', 465),
('87ec67c80086e00d95c4e38396e5d67c', 'John', 'john@gmail.com', '$2b$10$Ya99FtDq96lw/oBO3pV3GOBk6tL6MFpEQAL4wkrKGPlRDm3aX.m6.', 7428730894, 0, 'UK', 'AMERICA', 'NY', '2023-04-03', 'Splashscreen.png', '', 'smtp.gmail.com', 465),
('8b4b3577d4661f0ce820e4082b14843d', 'harry potter', 'hpgh048@gmail.com', 'Harsh@123', 9601376471, 1, 'INDIA', 'GUJARAT', 'SURAT', '2023-04-03', '2022-08-05.png', '', 'smtp.gmail.com', 465),
('8e9f92afd67614646b39ea357e2a1cf6', 'innovation team', 'innovationteam06@gmail.com', 'as@Qde234', 0, 0, '', '', '', '2023-04-18', 'https://lh3.googleusercontent.com/a/AGNmyxZh9FxEksnw2fbpzAvdSaYQpNZtRYEBUwX9yW12=s96-c', '', 'smtp.gmail.com', 465);

-- --------------------------------------------------------

--
-- Table structure for table `workflow`
--

CREATE TABLE `workflow` (
  `workflow_id` varchar(50) NOT NULL,
  `workflow_name` varchar(50) NOT NULL,
  `api_name` varchar(50) NOT NULL,
  `index_no` int(11) NOT NULL,
  `body_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workflow`
--

INSERT INTO `workflow` (`workflow_id`, `workflow_name`, `api_name`, `index_no`, `body_data`, `apikey`, `instance_id`) VALUES
('ac28175f559447e26596dc587b95a389', 'xyz', '/sendMail', 0, '{\"iid\":\"1b38a5e20fd0\",\"mail\": \"sakshi232innovation@gmail.com\", \"message\": \"how are you\", \"subject\": \"hello\"}', '8aa24803829cca7b638911159b596080', '1b38a5e20fd0'),
('ac28175f559447e26596dc587b95a389', 'xyz', '/sendMail', 1, '{\"iid\":\"1b38a5e20fd0\",\"mail\": \"sakshi232innovation@gmail.com\", \"message\": \"how are you?\", \"subject\": \"abcd\"}', '8aa24803829cca7b638911159b596080', '1b38a5e20fd0'),
('ae6700b331df0d50fed66a61ab787ef2', 'temp2', '', 0, '', '8aa24803829cca7b638911159b596080', '1b38a5e20fd0'),
('afa1c42248286cada78be12efacc6d7f', 'abcd', '', 0, '', '8aa24803829cca7b638911159b596080', '1b38a5e20fd0'),
('e7589020fe813b1c88c86f6aad107299', 'temp', '', 0, '', '8aa24803829cca7b638911159b596080', '1b38a5e20fd0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`channel_id`),
  ADD KEY `fk_apikey_channel` (`apikey`),
  ADD KEY `fk_iid_channel` (`instance_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `fk_apikey_contact` (`apikey`),
  ADD KEY `fk_iid_contact` (`instance_id`);

--
-- Indexes for table `contact_channel`
--
ALTER TABLE `contact_channel`
  ADD PRIMARY KEY (`contact_id`,`channel_id`),
  ADD KEY `fk_channel` (`channel_id`),
  ADD KEY `fk_apikey_contact_channel` (`apikey`),
  ADD KEY `fk_iid_contact_channel` (`instance_id`);

--
-- Indexes for table `cstm_template`
--
ALTER TABLE `cstm_template`
  ADD PRIMARY KEY (`cstm_id`),
  ADD KEY `fk_apikey_cstm_templet` (`apikey`);

--
-- Indexes for table `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`email_id`),
  ADD KEY `fk_iid_email` (`instance_id`),
  ADD KEY `fk_apikey_email` (`apikey`);

--
-- Indexes for table `instance`
--
ALTER TABLE `instance`
  ADD PRIMARY KEY (`instance_id`),
  ADD KEY `fk_apikey_instance` (`apikey`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`msgid`),
  ADD KEY `c1` (`apikey`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`planid`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `fk_iid_schedule` (`instance_id`),
  ADD KEY `fk_apikey_schedule` (`apikey`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`subID`),
  ADD KEY `fk_apikey_subscription` (`apikey`),
  ADD KEY `fk_planid` (`planID`);

--
-- Indexes for table `support_agents`
--
ALTER TABLE `support_agents`
  ADD PRIMARY KEY (`agent_id`);

--
-- Indexes for table `support_ticket`
--
ALTER TABLE `support_ticket`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `fk_apikey` (`apikey`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`temp_id`);

--
-- Indexes for table `ticket_reply`
--
ALTER TABLE `ticket_reply`
  ADD PRIMARY KEY (`index_no`,`identity`,`ticket_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`apikey`);

--
-- Indexes for table `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`workflow_id`,`index_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `planid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `support_agents`
--
ALTER TABLE `support_agents`
  MODIFY `agent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `channel`
--
ALTER TABLE `channel`
  ADD CONSTRAINT `fk_apikey_channel` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_iid_channel` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `fk_apikey_contact` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_iid_contact` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contact_channel`
--
ALTER TABLE `contact_channel`
  ADD CONSTRAINT `fk_apikey_contact_channel` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_channel` FOREIGN KEY (`channelID`) REFERENCES `channel` (`channelID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_contact` FOREIGN KEY (`contactID`) REFERENCES `contact` (`contact_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_iid_contact_channel` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cstm_template`
--
ALTER TABLE `cstm_template`
  ADD CONSTRAINT `fk_apikey_cstm_templet` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `email`
--
ALTER TABLE `email`
  ADD CONSTRAINT `fk_apikey_email` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_iid_email` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `instance`
--
ALTER TABLE `instance`
  ADD CONSTRAINT `fk_apikey_instance` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_apikey_message` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_apikey_schedule` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_iid_schedule` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `fk_apikey_subscription` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_planid` FOREIGN KEY (`planID`) REFERENCES `plans` (`planid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `support_ticket`
--
ALTER TABLE `support_ticket`
  ADD CONSTRAINT `fk_apikey_support_ticket` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
