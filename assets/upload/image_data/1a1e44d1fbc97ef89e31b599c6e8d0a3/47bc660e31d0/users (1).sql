-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2023 at 01:00 PM
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
  `hostname` varchar(100) NOT NULL,
  `port` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`apikey`, `uname`, `email`, `password`, `phone`, `phoneverify`, `country`, `state`, `city`, `registrationDate`, `image`, `emailpasscode`, `hostname`, `port`) VALUES
('1a1e44d1fbc97ef89e31b599c6e8d0a3', 'Poojan Gheewala', 'poojangheewala7@gmail.com', '', NULL, 0, 'INDIA', '', '', '2023-05-01', NULL, 'kiaehrrcixqwfouq', 'smtp.gmail.com', 465),
('1d2457174d1c9606fc98c5294f5283cf', 'abcd', 'abcd@gmail.com', 'as@Qde234', 1234567890, 0, '', '', '', '2023-04-03', '', '', '', 0),
('2c15c40862110afdff78eafa1f9e5899', 'Carla Rosario', 'mycuhor@mailinator.com', 'Pa$$w0rd!', 2147483647, 0, 'ALBANIA', 'QARKU I DURRESIT', 'DURRES', '2023-04-03', '', '', '', 0),
('3218fe07d468d5a42498754a6f5dd80f', '022_Harsh Gajjar', 'harshgajjar.mscit20@vnsgu.ac.i', '', NULL, 0, '', '', '', '2023-04-27', 'https://lh3.googleusercontent.com/a/AGNmyxY5ONPb84WYrse9nUwYYM7Olw4rtZo0z7gNxPnCpw=s96-c', '', '', 0),
('33a86c91b4f26bdd4c3b37bdbbdb2430', 'Azalia Macdonald', 'mubesida@mailinator.com', 'Pa$$w0rd!', 9611589648, 0, 'BERMUDA', 'SANDYS PARISH', '', '2023-04-03', '', '', '', 0),
('52a4a8c93ac698d6148f40e3e9f78e2b', 'MAX', 'maxnoah1143@gmail.com', '$2b$10$jAWNv65iTmQylvQXkeTp/.dwE7WYENdCVDWoZDIJ6x5Q2m5vk1UgO', 7859658963, 0, 'Azerbaijan', 'Gadabay Rayon', '', '2023-04-24', NULL, '', '', 0),
('623a67ec8d223c63b94757a02be0c206', 'Harsh Gajjar', 'gajjarharah1104@gmail.com', '', NULL, 0, '', '', '', '2023-04-03', 'gajjarharah1104@gmail.com', '', '', 0),
('6bb79635ecfe1be36e9c9980c1da9a3d', 'sakshi', 'sakshi@gmail.com', 'Abcd#1234', 7624032023, 1, 'INDIA', '', '', '2023-04-03', 'sadie5.png', '', '', 0),
('6d2942ad5a9020aa1c7db957e108ce63', 'sdas', 'abc@gmail.com', '$2b$10$nT8jexq7IoxVWNTVhN9JEeq97s7bv7bkHpPcknOgljgsRSCT2F/lS', 7843568431, 0, 'Andorra', 'Canillo', '', '2023-04-24', NULL, '', '', 0),
('7dc9bfc4dfd4b763acef2492dbc95256', 'Admin', 'admin@gmail.com', 'Admin123', 7589625689, 0, '', '', '', '2023-04-03', '', '', '', 0),
('87ec67c80086e00d95c4e38396e5d67c', 'John', 'john@gmail.com', 'Abcd#1234', 7428730894, 0, 'UK', 'AMERICA', 'NY', '2023-04-03', 'Splashscreen.png', '', '', 0),
('8b4b3577d4661f0ce820e4082b14843d', 'harry potter', 'hpgh048@gmail.com', 'Harsh@123', 9601376471, 1, 'INDIA', 'GUJARAT', 'SURAT', '2023-04-03', '2022-08-05.png', '', '', 0),
('8e9f92afd67614646b39ea357e2a1cf6', 'innovation team', 'innovationteam06@gmail.com', 'as@Qde234', 0, 0, '', '', '', '2023-04-18', 'https://lh3.googleusercontent.com/a/AGNmyxZh9FxEksnw2fbpzAvdSaYQpNZtRYEBUwX9yW12=s96-c', '', '', 0),
('c19e66c26964ed6f2256bbca029ca26e', 'Dashboard CRM', 'dashboardcrm.2022@gmail.com', '', NULL, 0, '', '', '', '2023-05-05', NULL, '', '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`apikey`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
