-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2023 at 08:05 AM
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
-- Table structure for table `support_agents`
--

CREATE TABLE `support_agents` (
  `agent_id` int(11) NOT NULL,
  `a_name` varchar(50) NOT NULL,
  `a_email` varchar(50) NOT NULL,
  `a_password` varchar(50) NOT NULL,
  `a_category` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_agents`
--

INSERT INTO `support_agents` (`agent_id`, `a_name`, `a_email`, `a_password`, `a_category`) VALUES
(1, 'poojan', '20bmiit087@gmail.com', 'poojan@123', 'Account Management'),
(2, 'sakshi', 'sakshi232innovation@gmail.com', 'sakshi@123', 'Technical Support'),
(3, 'harsh', 'hpgh048@gmail.com', 'harsh@123', 'Payment Problem'),
(4, 'vivek', 'lazypandas2022@gmail.com', 'vivek@123', 'Service Inquiry'),
(5, 'radhi', 'sakshiiit232@gmail.com', 'iit@123', 'Feedback and Suggestions');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `support_agents`
--
ALTER TABLE `support_agents`
  ADD PRIMARY KEY (`agent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `support_agents`
--
ALTER TABLE `support_agents`
  MODIFY `agent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
