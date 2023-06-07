-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2023 at 09:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

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
  `registrationDate` date NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `emailpasscode` varchar(50) NOT NULL,
  `hostname` varchar(100) NOT NULL DEFAULT 'smtp.gmail.com',
  `port` bigint(20) NOT NULL DEFAULT 465
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `users`
ADD
  PRIMARY KEY (`apikey`);

INSERT INTO
  `users` (
    `apikey`,
    `uname`,
    `email`,
    `password`,
    `phone`,
    `phoneverify`,
    `country`,
    `state`,
    `city`,
    `registrationDate`,
    `image`,
    `emailpasscode`,
    `hostname`,
    `port`
  )
VALUES
  (
    '1d2457174d1c9606fc98c5294f5283cf',
    'abcd',
    'abcd@gmail.com',
    'as@Qde234',
    1234567890,
    0,
    '',
    '',
    '',
    '2023-04-03',
    '',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '2c15c40862110afdff78eafa1f9e5899',
    'Carla Rosario',
    'mycuhor@mailinator.com',
    'Pa$$w0rd!',
    2147483647,
    0,
    'ALBANIA',
    'QARKU I DURRESIT',
    'DURRES',
    '2023-04-03',
    '',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '3218fe07d468d5a42498754a6f5dd80f',
    '022_Harsh Gajjar',
    'harshgajjar.mscit20@vnsgu.ac.i',
    '',
    NULL,
    0,
    '',
    '',
    '',
    '2023-04-27',
    'https://lh3.googleusercontent.com/a/AGNmyxY5ONPb84WYrse9nUwYYM7Olw4rtZo0z7gNxPnCpw=s96-c',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '33a86c91b4f26bdd4c3b37bdbbdb2430',
    'Azalia Macdonald',
    'mubesida@mailinator.com',
    'Pa$$w0rd!',
    9611589648,
    0,
    'BERMUDA',
    'SANDYS PARISH',
    '',
    '2023-04-03',
    '',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '478fa2f0b4994216f06f183c010bcab7',
    'abcxyz',
    'sakshi232innovation@gmail.com',
    'pwd123@S',
    2147483647,
    0,
    '',
    '',
    '',
    '2023-04-03',
    '',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '52a4a8c93ac698d6148f40e3e9f78e2b',
    'MAX',
    'maxnoah1143@gmail.com',
    '$2b$10$jAWNv65iTmQylvQXkeTp/.dwE7WYENdCVDWoZDIJ6x5Q2m5vk1UgO',
    7859658963,
    0,
    'Azerbaijan',
    'Gadabay Rayon',
    '',
    '2023-04-24',
    NULL,
    'asd5351as',
    'smtp.gmail.com',
    465
  ),
  (
    '623a67ec8d223c63b94757a02be0c206',
    'Harsh Gajjar',
    'gajjarharah1104@gmail.com',
    '',
    NULL,
    0,
    '',
    '',
    '',
    '2023-04-03',
    'gajjarharah1104@gmail.com',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '6bb79635ecfe1be36e9c9980c1da9a3d',
    'sakshi',
    'sakshi@gmail.com',
    'Abcd#1234',
    7624032023,
    1,
    'INDIA',
    '',
    '',
    '2023-04-03',
    'sadie5.png',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '6d2942ad5a9020aa1c7db957e108ce63',
    'sdas',
    'abc@gmail.com',
    '$2b$10$nT8jexq7IoxVWNTVhN9JEeq97s7bv7bkHpPcknOgljgsRSCT2F/lS',
    7843568431,
    0,
    'Andorra',
    'Canillo',
    '',
    '2023-04-24',
    NULL,
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '7dc9bfc4dfd4b763acef2492dbc95256',
    'Admin',
    'admin@gmail.com',
    'Admin123',
    7589625689,
    0,
    '',
    '',
    '',
    '2023-04-03',
    '',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '87ec67c80086e00d95c4e38396e5d67c',
    'John',
    'john@gmail.com',
    '$2b$10$Ya99FtDq96lw/oBO3pV3GOBk6tL6MFpEQAL4wkrKGPlRDm3aX.m6.',
    7428730894,
    0,
    'UK',
    'AMERICA',
    'NY',
    '2023-04-03',
    'Splashscreen.png',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '8b4b3577d4661f0ce820e4082b14843d',
    'harry potter',
    'hpgh048@gmail.com',
    'Harsh@123',
    9601376471,
    1,
    'INDIA',
    'GUJARAT',
    'SURAT',
    '2023-04-03',
    '2022-08-05.png',
    '',
    'smtp.gmail.com',
    465
  ),
  (
    '8e9f92afd67614646b39ea357e2a1cf6',
    'innovation team',
    'innovationteam06@gmail.com',
    'as@Qde234',
    0,
    0,
    '',
    '',
    '',
    '2023-04-18',
    'https://lh3.googleusercontent.com/a/AGNmyxZh9FxEksnw2fbpzAvdSaYQpNZtRYEBUwX9yW12=s96-c',
    '',
    'smtp.gmail.com',
    465
  );

CREATE TABLE `instance` (
  `instance_id` varchar(50) NOT NULL,
  `i_name` varchar(30) DEFAULT NULL,
  `apikey` varchar(255) NOT NULL,
  `token` varchar(50) NOT NULL,
  `create_date` date NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `instance`
ADD
  CONSTRAINT `fk_apikey_instance` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
  `instance`
ADD
  PRIMARY KEY (`instance_id`),
ADD
  KEY `fk_apikey_instance` (`apikey`);

INSERT INTO
  `instance` (
    `instance_id`,
    `i_name`,
    `apikey`,
    `token`,
    `create_date`,
    `isActive`
  )
VALUES
  (
    '035f4d70aceb',
    'harsh',
    '8b4b3577d4661f0ce820e4082b14843d',
    'a2aa4c9a99a6aca55915',
    '2023-04-03',
    0
  ),
  (
    '04905a89f9b9',
    'aaaaaaaa',
    '8b4b3577d4661f0ce820e4082b14843d',
    '00e27a50a99549ca91e8',
    '2023-05-03',
    0
  ),
  (
    '0a8073f093bb',
    'test 1',
    '8b4b3577d4661f0ce820e4082b14843d',
    '69b1767c94b602ca',
    '2023-01-28',
    0
  ),
  (
    '11731b58db86',
    'test 7',
    '52a4a8c93ac698d6148f40e3e9f78e2b',
    '8835d812fcbbde290574',
    '2023-04-25',
    1
  ),
  (
    '1849a5266cce',
    'qwert',
    '623a67ec8d223c63b94757a02be0c206',
    '343feb3fcd01fd376d06',
    '2023-02-28',
    0
  ),
  (
    '2deea8241267',
    'test 4',
    '623a67ec8d223c63b94757a02be0c206',
    '97382f42fb7e493975ff',
    '2023-02-28',
    0
  ),
  (
    '2f83e88b2b34',
    'test 3',
    '8b4b3577d4661f0ce820e4082b14843d',
    '13aec37c7fbef80f',
    '2023-01-28',
    0
  ),
  (
    '49595459e83c',
    'v',
    '52a4a8c93ac698d6148f40e3e9f78e2b',
    'ba7d1e33bc5dfa53950b',
    '2023-04-24',
    0
  ),
  (
    '6a0d2f023c0e',
    'test 7',
    '87ec67c80086e00d95c4e38396e5d67c',
    'e5949026e32ded5e83bc',
    '2023-02-03',
    0
  ),
  (
    '816092a3e6ca',
    'test 1 ',
    '87ec67c80086e00d95c4e38396e5d67c',
    '917af3c2a605d85940e3',
    '2023-02-28',
    0
  ),
  (
    '853aeb412fa6',
    'a',
    '87ec67c80086e00d95c4e38396e5d67c',
    'd9429c5a408b57f54626',
    '2023-04-11',
    0
  ),
  (
    'bf88906cc243',
    'test 4',
    '8b4b3577d4661f0ce820e4082b14843d',
    '56c118df06aa9214',
    '2023-02-04',
    0
  ),
  (
    'd170624c80b6',
    'asd',
    '8b4b3577d4661f0ce820e4082b14843d',
    '0640de86561e76315a7a',
    '2023-05-03',
    0
  ),
  (
    'daf5f8b0d07d',
    'asf',
    '87ec67c80086e00d95c4e38396e5d67c',
    'd0dbb522d9db8d68',
    '2023-02-07',
    0
  ),
  (
    'f700d8f37f27',
    'test 4',
    '52a4a8c93ac698d6148f40e3e9f78e2b',
    '06d8308b0d53cacadce8',
    '2023-05-06',
    0
  ),
  (
    'f730cdd15a56',
    'test 4',
    '87ec67c80086e00d95c4e38396e5d67c',
    '1d0d636692410ae0',
    '2023-01-28',
    0
  ),
  (
    'f8ff0e43303b',
    'aa',
    '8b4b3577d4661f0ce820e4082b14843d',
    '3845b12bc104fc7945f3',
    '2023-05-03',
    0
  );

CREATE TABLE `contact` (
  `contact_id` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `contact`
ADD
  PRIMARY KEY (`contact_id`),
ADD
  KEY `fk_apikey_contact` (`apikey`),
ADD
  KEY `fk_iid_contact` (`instance_id`);

ALTER TABLE
  `contact`
ADD
  CONSTRAINT `fk_apikey_contact` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_iid_contact` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `channel` (
  `channel_id` varchar(50) NOT NULL,
  `channelName` varchar(30) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `channel`
ADD
  PRIMARY KEY (`channel_id`),
ADD
  KEY `fk_apikey_channel` (`apikey`),
ADD
  KEY `fk_iid_channel` (`instance_id`);

ALTER TABLE
  `channel`
ADD
  CONSTRAINT `fk_apikey_channel` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_iid_channel` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `contact_channel` (
  `channel_id` varchar(50) NOT NULL,
  `contact_id` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `contact_channel`
ADD
  PRIMARY KEY (`contact_id`, `channel_id`),
ADD
  KEY `fk_channel_contact_channel` (`channel_id`),
ADD
  KEY `fk_apikey_contact_channel` (`apikey`),
ADD
  KEY `fk_iid_contact_channel` (`instance_id`);

ALTER TABLE
  `contact_channel`
ADD
  CONSTRAINT `fk_apikey_contact_channel` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_channel` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`channel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_contact` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`contact_id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_iid_contact_channel` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `aname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `admin`
ADD
  PRIMARY KEY (`id`);

INSERT INTO
  `admin` (`id`, `aname`, `email`, `password`)
VALUES
  (
    1,
    'admin1',
    'admin@gmail.com',
    '$2b$10$cLFPNIibKrNUUz4ZZp6Uae2B/cFjhIJAJXJpLdRnjaoLwLJ91JH6y'
  );

CREATE TABLE `cstm_template` (
  `cstm_id` varchar(255) NOT NULL,
  `cstm_name` varchar(255) NOT NULL,
  `cstm_msg` varchar(255) NOT NULL,
  `userfields` int(255) NOT NULL,
  `apikey` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `cstm_template`
ADD
  PRIMARY KEY (`cstm_id`),
ADD
  KEY `fk_apikey_cstm_templet` (`apikey`);

ALTER TABLE
  `cstm_template`
ADD
  CONSTRAINT `fk_apikey_cstm_templet` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO
  `cstm_template` (
    `cstm_id`,
    `cstm_name`,
    `cstm_msg`,
    `userfields`,
    `apikey`
  )
VALUES
  (
    'afa0a1c1794a',
    'Gajjar',
    '~!@#$%^&*()`1234567890_-+=|\\}]{[:;\"\<,>.?/+-*/. \n\n[value1]\n[value2]',
    2,
    '52a4a8c93ac698d6148f40e3e9f78e2b'
  );

CREATE TABLE `email` (
  `email_id` varchar(50) NOT NULL,
  `from_email` varchar(30) NOT NULL,
  `to_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email_type` varchar(30) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` mediumtext NOT NULL,
  `instance_id` varchar(50) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `email`
ADD
  PRIMARY KEY (`email_id`),
ADD
  KEY `fk_iid_email` (`instance_id`),
ADD
  KEY `fk_apikey_email` (`apikey`);

ALTER TABLE
  `email`
ADD
  CONSTRAINT `fk_apikey_email` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_iid_email` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `message` (
  `msgid` varchar(50) NOT NULL,
  `msg` text NOT NULL,
  `msg_type` varchar(20) NOT NULL,
  `receiver` varchar(20) NOT NULL,
  `instance_id` varchar(50) NOT NULL,
  `apikey` varchar(50) NOT NULL,
  `token` varchar(50) NOT NULL,
  `time` datetime NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `message`
ADD
  CONSTRAINT `fk_apikey_message` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
  `message`
ADD
  PRIMARY KEY (`msgid`),
ADD
  KEY `c1` (`apikey`);

CREATE TABLE `plans` (
  `planid` int(11) NOT NULL,
  `pname` varchar(40) NOT NULL,
  `price` int(11) NOT NULL,
  `durationMonth` int(11) NOT NULL,
  `totalInstance` int(11) NOT NULL,
  `totalMessage` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `plan_type` varchar(20) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `plans`
ADD
  PRIMARY KEY (`planid`);

INSERT INTO
  `plans` (
    `planid`,
    `pname`,
    `price`,
    `durationMonth`,
    `totalInstance`,
    `totalMessage`,
    `discount`,
    `plan_type`
  )
VALUES
  (101, 'Basic', 0, 1, 1, 500, 0, 'Monthly'),
  (102, 'Standard', 1000, 1, 10, 5000, 0, 'Monthly'),
  (103, 'Premium', 2000, 1, 50, 12500, 0, 'Monthly'),
  (
    104,
    'Standard',
    10000,
    12,
    120,
    60000,
    17,
    'Yearly'
  ),
  (
    105,
    'Premium',
    20000,
    12,
    300,
    150000,
    17,
    'Yearly'
  );

CREATE TABLE `schedule` (
  `schedule_id` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  `time` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
);

ALTER TABLE
  `schedule`
ADD
  PRIMARY KEY (`schedule_id`);

-- ALTER TABLE
--   `schedule` -- ADD
--   --   CONSTRAINT `fk_apikey_schedule` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
-- ADD
--   CONSTRAINT `fk_iid_schedule` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`instance_id`) ON DELETE CASCADE ON UPDATE CASCADE;--
-- asd
CREATE TABLE `subscription` (
  `subID` varchar(20) NOT NULL,
  `planID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `apikey` varchar(50) NOT NULL,
  `paymentID` varchar(50) NOT NULL,
  `orderID` varchar(50) NOT NULL,
  `pay_date` date NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `subscription`
ADD
  PRIMARY KEY (`subID`),
ADD
  KEY `fk_apikey_subscription` (`apikey`),
ADD
  KEY `fk_planid` (`planID`);

ALTER TABLE
  `subscription`
ADD
  CONSTRAINT `fk_apikey_subscription` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD
  CONSTRAINT `fk_planid` FOREIGN KEY (`planID`) REFERENCES `plans` (`planid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE `support_agents` (
  `agent_id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `support_agents`
ADD
  PRIMARY KEY (`agent_id`);

ALTER TABLE
  `support_agents`
MODIFY
  `agent_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 7;

INSERT INTO
  `support_agents` (
    `agent_id`,
    `name`,
    `email`,
    `password`,
    `category`
  )
VALUES
  (
    1,
    'poojan',
    '20bmiit087@gmail.com',
    'poojan@123',
    'Account Management'
  ),
  (
    2,
    'sakshi',
    'sakshi232innovation@gmail.com',
    'sakshi@123',
    'Technical Support'
  ),
  (
    3,
    'harsh',
    'hpgh048@gmail.com',
    '$2b$10$IdWV2C55XmE5vWybIFGO7.Njmqbp4.22.mcJlS6YTJln7Ndh6IyrW',
    'Payment Problem'
  ),
  (
    4,
    'vivek',
    'lazypandas2022@gmail.com',
    'vivek@123',
    'Service Inquiry'
  ),
  (
    5,
    'radhi',
    'sakshiiit232@gmail.com',
    'iit@123',
    'Feedback and Suggestions'
  );

CREATE TABLE `support_ticket` (
  `ticket_id` varchar(50) NOT NULL,
  `client_id` varchar(10) NOT NULL,
  `category` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `t_subject` varchar(100) NOT NULL,
  `t_type` varchar(50) NOT NULL,
  `t_description` mediumtext NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'open',
  `generation_time` timestamp NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `agent_email` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `support_ticket`
ADD
  PRIMARY KEY (`ticket_id`),
ADD
  KEY `fk_apikey` (`apikey`);

ALTER TABLE
  `support_ticket`
ADD
  CONSTRAINT `fk_apikey_support_ticket` FOREIGN KEY (`apikey`) REFERENCES `users` (`apikey`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `template` (
  `temp_id` int(255) NOT NULL,
  `temp_name` varchar(255) NOT NULL,
  `temp_message` longtext NOT NULL,
  `userfields` int(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `template`
ADD
  PRIMARY KEY (`temp_id`);

INSERT INTO
  `template` (
    `temp_id`,
    `temp_name`,
    `temp_message`,
    `userfields`
  )
VALUES
  (
    1,
    'reminder',
    'You made a purchase for [value1] using a credit card ending in [value2].',
    2
  ),
  (
    2,
    'newLaunch1',
    'Hey [value1] the wait is finally over! We know you wanted you to be the first to hear about our spring collection Check it out here! [value2].\n',
    2
  ),
  (
    3,
    'newLaunch2',
    'What’s hip, hot and sure to sell out fast? That’s right, [value1], the [value2] spring collection is here 👚 👟 You wanted to be the first to hear about it, so update your workout wardrobe now at [value3]!',
    3
  ),
  (
    4,
    'restocked item 1',
    'Hi [value1], the [value2] you wanted is now back by popular demand 🥳 To thank you for waiting, we’re offering you free delivery for purchases of above [value3]. Grab it now at [value4]!',
    4
  ),
  (
    5,
    'restocked item 2',
    'As promised, [value1], you’re the first to know that [value2] is back in stock 🥳 Get it immediately at [value3] or visit any of our retail outlets 🏢 We’re located at: [value4]. Let us know if we can reserve one in-store for you!',
    4
  ),
  (
    6,
    'sales and promotion item 1',
    'New Promotion 🛎️ This month’s special offer is [value1]. We’re also offering loyal customers like you, [value2], a 5% discount on orders above [value3]. Use the promo code DISCOUNT5. Order now at [value4].',
    4
  ),
  (
    7,
    'sales and promotion item 2',
    'Hi [value1]! We’ve got a hot 🔥 tip for you: Grab this month’s special promotion of [value2] immediately. This is limited to the first [value3] customers, so be quick! Shop now 🛒 at [value4].[value5]',
    5
  ),
  (
    8,
    'loyalty rewards 1',
    'Hi [value1], our new product drop goes live at [value2] tomorrow and we wanted you to have first access 🥳 The [value3] is a limited release so let us know if you would like us to put one aside for you. Reserve yours quickly!',
    3
  ),
  (
    9,
    'loyalty rewards 2',
    'Dear [value1], thank you for being a loyal member of [value2] 🙏 Here’s an exclusive 10% off our new collection with the promo code 10TQ. There’s also a free gift 🎁 for orders above [value3] as a token of our appreciation. Shop now at [value4].',
    4
  ),
  (
    10,
    're-engagement 1',
    'It’s been a while, [value1] 👋 Since your last visit, we have expanded our products and services to provide the best wellness experience around. Why not drop by for a yoga 🧘 class or a matcha 🍵 tasting session? Reserve your workshop of choice at [value2]. We hope to see you!',
    2
  ),
  (
    11,
    're-engagement 2',
    'Hi [value1]! We miss you at [value2], so we’d like to offer you an exclusive 8% off storewide 🥳 Browse through our latest products at [value3] and apply the code YAY8OFF at check-out 🛒.',
    3
  );

CREATE TABLE `ticket_reply` (
  `index_no` int(255) NOT NULL,
  `identity` varchar(20) NOT NULL,
  `ticket_id` varchar(50) NOT NULL,
  `reply` mediumtext NOT NULL,
  `reply_time` timestamp NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `ticket_reply`
ADD
  PRIMARY KEY (`index_no`, `identity`, `ticket_id`);

CREATE TABLE `workflow` (
  `workflow_id` varchar(50) NOT NULL,
  `workflow_name` varchar(50) NOT NULL,
  `api_name` varchar(50) NOT NULL,
  `index_no` int(11) NOT NULL,
  `body_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `apikey` varchar(255) NOT NULL,
  `instance_id` varchar(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

ALTER TABLE
  `workflow`
ADD
  PRIMARY KEY (`workflow_id`, `index_no`);

COMMIT;