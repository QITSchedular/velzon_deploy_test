-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 11:49 AM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `email`
--
ALTER TABLE `email`
  ADD PRIMARY KEY (`email_id`),
  ADD KEY `fk_iid_email` (`instance_id`),
  ADD KEY `fk_apikey_email` (`apikey`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `email`
--
ALTER TABLE `email`
  ADD CONSTRAINT `fk_apikey_email` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_iid_email` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
