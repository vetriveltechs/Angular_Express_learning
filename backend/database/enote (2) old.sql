-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2025 at 06:13 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enote`
--

-- --------------------------------------------------------

--
-- Table structure for table `blood_group`
--

CREATE TABLE `blood_group` (
  `blood_group_id` int(11) NOT NULL,
  `blood_group_name` varchar(100) DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blood_group`
--

INSERT INTO `blood_group` (`blood_group_id`, `blood_group_name`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'AB+', 'Y', NULL, '2024-10-10 18:05:46', NULL, '2024-10-10 18:08:33'),
(2, 'BC+', 'Y', NULL, '2024-10-10 18:18:46', NULL, '2024-10-10 18:20:19');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(150) DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'Junior Software Developer', 'Y', NULL, '2024-10-10 04:24:45', NULL, '2024-10-10 04:24:45'),
(2, 'Senior Devloper', 'Y', NULL, '2024-10-10 04:25:53', NULL, '2024-10-10 04:25:53');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `designation_id` int(11) NOT NULL,
  `designation_name` varchar(150) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `created_by` int(11) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`designation_id`, `designation_name`, `description`, `active_flag`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'Backend Developer', 'Backend Developer', 'Y', NULL, NULL, NULL, NULL),
(2, 'Frontend Developer', 'Frontend Developer', 'Y', NULL, NULL, NULL, NULL),
(3, 'Full Developer', 'Full Developer', 'Y', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doc_document_numbering`
--

CREATE TABLE `doc_document_numbering` (
  `document_numbering_id` int(11) NOT NULL,
  `document_numbering_type` varchar(150) DEFAULT NULL,
  `document_type` varchar(150) DEFAULT NULL,
  `prefix` varchar(20) DEFAULT NULL,
  `next_number` varchar(20) DEFAULT NULL,
  `suffix` varchar(20) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `active_flag` varchar(1) NOT NULL DEFAULT 'Y',
  `inactive_date` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doc_document_numbering`
--

INSERT INTO `doc_document_numbering` (`document_numbering_id`, `document_numbering_type`, `document_type`, `prefix`, `next_number`, `suffix`, `from_date`, `to_date`, `active_flag`, `inactive_date`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'EMP', 'Employee', 'EMP-', '1001', NULL, NULL, NULL, 'Y', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `list_type_values`
--

CREATE TABLE `list_type_values` (
  `list_type_values_id` int(11) NOT NULL,
  `lov_id` int(11) DEFAULT NULL,
  `list_code` varchar(150) DEFAULT NULL,
  `list_value` varchar(150) DEFAULT NULL,
  `order_sequence` int(11) DEFAULT NULL,
  `short_description` varchar(150) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list_type_values`
--

INSERT INTO `list_type_values` (`list_type_values_id`, `lov_id`, `list_code`, `list_value`, `order_sequence`, `short_description`, `start_date`, `end_date`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 1, 'PERMANENT', 'permanent', 1, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 10:34:47', NULL, '2024-10-09 10:34:47'),
(2, 1, 'TEMPORARY', 'Temporary', 2, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 10:35:49', NULL, '2024-10-09 10:35:49'),
(3, 1, 'FREELANCER', 'Freelancer', 3, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 10:36:18', NULL, '2024-10-09 10:36:18'),
(4, 2, 'Y', 'Active', 1, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 10:58:16', NULL, '2024-10-09 10:58:16'),
(5, 2, 'N', 'Inactive', 2, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 10:58:22', NULL, '2024-10-09 10:58:22'),
(6, 3, 'Y', 'Active', 1, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 11:00:34', NULL, '2024-10-09 11:00:34'),
(7, 3, 'N', 'Inactive', 2, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 11:00:43', NULL, '2024-10-09 11:00:43'),
(8, 3, 'ALL', 'All', 3, NULL, NULL, NULL, 'Y', NULL, '2024-10-09 11:00:51', NULL, '2024-10-09 11:00:51'),
(9, 4, 'PERMANENT', 'Permanent', 1, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 17:04:09', NULL, '2024-10-10 17:04:09'),
(10, 4, 'TEMPORARY', 'Temporary', 2, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 17:04:48', NULL, '2024-10-10 17:04:48'),
(11, 4, 'FREELANCER', 'Freelancer', 3, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 17:05:27', NULL, '2024-10-10 17:05:27'),
(12, 4, 'CONTRACT', 'Contract', 4, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 17:12:17', NULL, '2024-10-10 17:12:17'),
(13, 5, 'MALE', 'Male', 1, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 18:37:46', NULL, '2024-10-10 18:37:46'),
(14, 5, 'FEMALE', 'Female', 2, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 18:37:58', NULL, '2024-10-10 18:37:58'),
(15, 5, 'TRANSGENDER', 'Transgender', 3, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 18:38:35', NULL, '2024-10-10 18:38:35'),
(16, 6, 'WEEK', 'Week', 1, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 19:41:10', NULL, '2024-10-10 19:41:10'),
(17, 6, 'MONTH', 'Month', 2, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 19:41:18', NULL, '2024-10-10 19:41:18'),
(18, 6, 'YEAR', 'Year', 3, NULL, NULL, NULL, 'Y', NULL, '2024-10-10 19:41:30', NULL, '2024-10-10 19:41:30'),
(19, 1, 'EMPLOYEE', 'Employee', 4, NULL, NULL, NULL, 'Y', NULL, '2024-11-08 02:31:58', NULL, '2024-11-08 02:31:58'),
(20, 7, 'EMP', 'Employee', 1, NULL, NULL, NULL, 'Y', NULL, '2025-01-26 17:02:52', NULL, '2025-01-26 17:02:52');

-- --------------------------------------------------------

--
-- Table structure for table `lov`
--

CREATE TABLE `lov` (
  `lov_id` int(11) NOT NULL,
  `list_name` varchar(150) DEFAULT NULL,
  `list_description` text DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lov`
--

INSERT INTO `lov` (`lov_id`, `list_name`, `list_description`, `from_date`, `to_date`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'USERS TYPE', 'Users Type', '2024-09-29', '2024-09-30', 'Y', NULL, '2024-10-09 10:33:34', NULL, '2024-10-09 10:54:41'),
(2, 'ROLE STATUS', 'Role Status', '2024-10-01', '2024-10-03', 'Y', NULL, '2024-10-09 10:57:57', NULL, '2024-10-09 10:57:57'),
(3, 'ACTIVE STATUS', 'Active Status', '2024-10-01', '2024-10-04', 'Y', NULL, '2024-10-09 10:58:47', NULL, '2024-10-09 10:58:47'),
(4, 'EMPLOYEE TYPE', 'Employee Type', '2024-10-01', '2024-10-03', 'Y', NULL, '2024-10-10 17:01:13', NULL, '2024-10-10 17:01:13'),
(5, 'GENDER', 'Gender', '2024-10-01', '2024-10-02', 'Y', NULL, '2024-10-10 18:37:33', NULL, '2024-10-10 18:37:33'),
(6, 'PAY FREQUENCY', 'Pay Frequency', '2024-10-01', '2024-10-02', 'Y', NULL, '2024-10-10 19:40:43', NULL, '2024-10-10 19:40:43'),
(7, 'MODULES', 'Modules', '2024-12-31', '2025-01-03', 'Y', NULL, '2025-01-26 17:02:23', NULL, '2025-01-26 17:02:33');

-- --------------------------------------------------------

--
-- Table structure for table `per_people_all`
--

CREATE TABLE `per_people_all` (
  `employee_id` int(11) NOT NULL,
  `employee_type` varchar(150) DEFAULT NULL,
  `employee_number` varchar(150) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `alt_mobile_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `alt_email` varchar(100) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `blood_group` int(11) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `designation_id` int(11) DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL,
  `date_of_relieving` date DEFAULT NULL,
  `previous_experience` int(11) DEFAULT NULL,
  `rate_per_hour` decimal(10,2) DEFAULT NULL,
  `rate_per_day` decimal(10,2) DEFAULT NULL,
  `pay_frequency` varchar(50) DEFAULT NULL,
  `aadhar_number` varchar(20) DEFAULT NULL,
  `pan_number` varchar(20) DEFAULT NULL,
  `driving_licence` varchar(20) DEFAULT NULL,
  `passport_number` varchar(20) DEFAULT NULL,
  `passport_issue_date` date DEFAULT NULL,
  `passport_expiry_date` date DEFAULT NULL,
  `pf_number` varchar(20) DEFAULT NULL,
  `esi_number` varchar(20) DEFAULT NULL,
  `uan_number` varchar(20) DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `address_3` varchar(255) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `account_number` varchar(20) DEFAULT NULL,
  `account_holder_number` varchar(100) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(20) DEFAULT NULL,
  `micr_code` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `per_people_all`
--

INSERT INTO `per_people_all` (`employee_id`, `employee_type`, `employee_number`, `first_name`, `middle_name`, `last_name`, `mobile_number`, `alt_mobile_number`, `email`, `alt_email`, `father_name`, `mother_name`, `date_of_birth`, `gender`, `blood_group`, `department`, `department_id`, `designation_id`, `date_of_joining`, `date_of_relieving`, `previous_experience`, `rate_per_hour`, `rate_per_day`, `pay_frequency`, `aadhar_number`, `pan_number`, `driving_licence`, `passport_number`, `passport_issue_date`, `passport_expiry_date`, `pf_number`, `esi_number`, `uan_number`, `address_1`, `address_2`, `address_3`, `postal_code`, `account_number`, `account_holder_number`, `bank_name`, `branch_name`, `ifsc_code`, `micr_code`, `address`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'PERMANENT', '', 'Manoj', 'Kumar', 'M', '7010016615', '9978269963', 'manoj@gmail.com', 'manojkumar@gmail.com', 'Murugesan', 'Selvarani', '0000-00-00', 'MALE', 1, '1', 1, 1, '2024-10-01', '2024-10-02', 2, '2000.00', '16000.00', 'WEEK', '123456789012', 'ABCD123', '', '', '0000-00-00', '0000-00-00', '', '', '', 'ATTUR', 'SALEM', 'Tamil Nadu', '636141', '123456789', 'Manoj Kumar', 'SBI', 'ATTUR', '1234567891', 'MKIU12345', 'Attur', 'Y', NULL, '2024-10-10 19:51:29', NULL, '2025-01-26 17:01:26'),
(3, 'PERMANENT', 'EMP-1000', 'vetri', 'Vel', 'M', '6380394289', '9087334690', 'vetriveltechs@gmail.com', 'vetri@gmail.com', 'Murugesan', 'Selvarani', '1999-12-22', 'MALE', 1, NULL, 1, 1, '2000-01-01', '2000-01-04', 2, '1000.00', '8000.00', 'MONTH', '1234567891', 'A12345CD', 'TNSJDKSD52', '123456789', '2000-01-06', '2000-01-08', '789456123', '', '1478520369', 'Attur', 'Attur', 'Attur', '636141', '6363656566', 'Vetrivel', 'SBI', 'Attur', 'A12349089', 'J89098909', 'Attur', 'Y', NULL, '2025-01-26 17:11:52', NULL, '2025-01-26 17:11:52');

-- --------------------------------------------------------

--
-- Table structure for table `per_user`
--

CREATE TABLE `per_user` (
  `user_id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `user_type` varchar(50) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `per_user`
--

INSERT INTO `per_user` (`user_id`, `person_id`, `user_type`, `user_name`, `password`, `start_date`, `end_date`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 1, 'EMPLOYEE', 'manoj', '$2a$10$6s/SjlWQeUNDsZqGkj7ZquHAzhewC0mT4raUcmABf/DKKULGAEKTC', '2024-11-01', '2024-11-01', 'Y', NULL, '2024-11-08 02:32:30', NULL, '2024-11-08 02:32:30');

-- --------------------------------------------------------

--
-- Table structure for table `per_user_roles`
--

CREATE TABLE `per_user_roles` (
  `user_role_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role_name` varchar(100) DEFAULT NULL,
  `role_status` varchar(1) DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `per_user_roles`
--

INSERT INTO `per_user_roles` (`user_role_id`, `role_id`, `user_id`, `role_name`, `role_status`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 1, 1, 'Admin', 'Y', 'Y', NULL, '2024-10-09 11:01:36', NULL, '2024-10-09 11:01:36'),
(2, 2, 1, 'Sales Manager', 'N', 'Y', NULL, '2024-10-09 11:01:36', NULL, '2024-10-09 11:01:36'),
(3, 2, 2, 'Sales Manager', 'Y', 'Y', NULL, '2024-10-09 11:02:21', NULL, '2024-10-09 11:02:21'),
(4, 1, 1, 'Admin', 'Y', 'Y', NULL, '2024-11-08 02:32:30', NULL, '2024-11-08 02:32:30');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(100) DEFAULT NULL,
  `role_description` text DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `role_description`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'Admin', NULL, 'Y', NULL, '2024-10-09 10:48:39', NULL, '2024-10-09 10:48:39'),
(2, 'Sales Manager', NULL, 'Y', NULL, '2024-10-09 10:48:51', NULL, '2024-10-09 10:48:51'),
(3, 'Supervisor', NULL, 'Y', NULL, '2024-10-09 10:49:10', NULL, '2024-10-09 10:49:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT 'Y',
  `create_by` varchar(100) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_updated_by` varchar(100) DEFAULT NULL,
  `last_updated_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'vetrivel', '123456', 'Y', NULL, '2024-10-09 11:20:38', NULL, '2024-11-08 02:39:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blood_group`
--
ALTER TABLE `blood_group`
  ADD PRIMARY KEY (`blood_group_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`designation_id`),
  ADD KEY `designation_id` (`designation_id`,`designation_name`,`active_flag`,`created_by`,`created_date`);

--
-- Indexes for table `doc_document_numbering`
--
ALTER TABLE `doc_document_numbering`
  ADD PRIMARY KEY (`document_numbering_id`);

--
-- Indexes for table `list_type_values`
--
ALTER TABLE `list_type_values`
  ADD PRIMARY KEY (`list_type_values_id`);

--
-- Indexes for table `lov`
--
ALTER TABLE `lov`
  ADD PRIMARY KEY (`lov_id`);

--
-- Indexes for table `per_people_all`
--
ALTER TABLE `per_people_all`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `per_user`
--
ALTER TABLE `per_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`);

--
-- Indexes for table `per_user_roles`
--
ALTER TABLE `per_user_roles`
  ADD PRIMARY KEY (`user_role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blood_group`
--
ALTER TABLE `blood_group`
  MODIFY `blood_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doc_document_numbering`
--
ALTER TABLE `doc_document_numbering`
  MODIFY `document_numbering_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `list_type_values`
--
ALTER TABLE `list_type_values`
  MODIFY `list_type_values_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `lov`
--
ALTER TABLE `lov`
  MODIFY `lov_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `per_people_all`
--
ALTER TABLE `per_people_all`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `per_user`
--
ALTER TABLE `per_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `per_user_roles`
--
ALTER TABLE `per_user_roles`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
