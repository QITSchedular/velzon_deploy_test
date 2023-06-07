-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2023 at 08:50 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

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
-- Indexes for table `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`workflow_id`,`index_no`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
