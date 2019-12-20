-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 20, 2019 at 10:54 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `mycto-test`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'Pulp Fiction', '2019-12-20 09:40:45', '2019-12-20 09:40:45'),
(2, 'The Dark Knight', '2019-12-20 09:40:46', '2019-12-20 09:40:46'),
(3, 'Forrest Gump', '2019-12-20 09:40:47', '2019-12-20 09:40:47'),
(4, 'The Godfather', '2019-12-20 10:32:49', '2019-12-20 10:32:49'),
(5, 'Dilwale Dulhania Le Jayenge', '2019-12-20 10:38:48', '2019-12-20 10:38:48'),
(6, 'The Shawshank Redemption', '2019-12-20 10:39:16', '2019-12-20 10:39:16'),
(7, 'The Godfather: Part II', '2019-12-20 10:41:21', '2019-12-20 10:41:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `createdAt`, `updatedAt`) VALUES
(1, 'Anthony', 'De Morais', '2019-12-20 09:40:33', '2019-12-20 09:40:33'),
(2, 'User2', 'user', '2019-12-20 10:34:07', '2019-12-20 10:34:07');

-- --------------------------------------------------------

--
-- Table structure for table `user_movies`
--

CREATE TABLE `user_movies` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_movies`
--

INSERT INTO `user_movies` (`createdAt`, `updatedAt`, `userId`, `movieId`) VALUES
('2019-12-20 09:40:46', '2019-12-20 09:40:46', 1, 2),
('2019-12-20 09:40:47', '2019-12-20 09:40:47', 1, 3),
('2019-12-20 10:41:17', '2019-12-20 10:41:17', 1, 6),
('2019-12-20 10:41:21', '2019-12-20 10:41:21', 1, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_movies`
--
ALTER TABLE `user_movies`
  ADD PRIMARY KEY (`userId`,`movieId`),
  ADD KEY `movieId` (`movieId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_movies`
--
ALTER TABLE `user_movies`
  ADD CONSTRAINT `user_movies_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_movies_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
