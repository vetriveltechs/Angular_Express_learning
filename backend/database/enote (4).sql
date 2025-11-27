-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2025 at 10:53 AM
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
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `city_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active_flag` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `inactive_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `country_id`, `state_id`, `district_id`, `city_name`, `active_flag`, `inactive_date`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 1, 1, NULL, 'Ernakulam', 'Y', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countrys`
--

CREATE TABLE `countrys` (
  `country_id` int(3) NOT NULL,
  `country_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_symbol` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency_code` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `default_country` int(11) DEFAULT NULL,
  `active_flag` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `inactive_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `countrys`
--

INSERT INTO `countrys` (`country_id`, `country_name`, `country_code`, `currency_symbol`, `currency_code`, `default_country`, `active_flag`, `inactive_date`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'India', '+91', '?', 'INR', 1, 'Y', NULL, 1, '2023-08-19 13:09:30', 1, '2023-10-13 10:05:03'),
(2, 'USA', '92', '92', 'USD', 0, 'Y', NULL, 1, '2023-08-21 09:08:31', 1, '2023-08-21 09:08:31');

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
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(150) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `address_1` varchar(150) DEFAULT NULL,
  `address_2` varchar(150) DEFAULT NULL,
  `address_3` varchar(150) DEFAULT NULL,
  `pin_code` int(11) DEFAULT NULL,
  `active_flag` varchar(1) NOT NULL DEFAULT 'Y',
  `inactive_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `deleted_flag` varchar(1) DEFAULT 'N',
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`location_id`, `location_name`, `country_id`, `state_id`, `city_id`, `address_1`, `address_2`, `address_3`, `pin_code`, `active_flag`, `inactive_date`, `start_date`, `end_date`, `deleted_flag`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'Kerala -->Ernakulam', 1, 1, 1, 'Ernakulam,kerala', NULL, NULL, 636141, 'Y', NULL, NULL, NULL, 'N', NULL, NULL, NULL, NULL);

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
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `organization_id` int(11) NOT NULL,
  `organization_code` varchar(10) DEFAULT NULL,
  `organization_name` varchar(150) DEFAULT NULL,
  `organization_description` varchar(150) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `active_flag` varchar(1) NOT NULL DEFAULT 'Y',
  `inactive_date` datetime DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `deleted_flag` varchar(1) DEFAULT 'N',
  `industry_type` varchar(150) DEFAULT NULL,
  `contact_person` varchar(150) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `user_name` varchar(150) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  `organization_image` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`organization_id`, `organization_code`, `organization_name`, `organization_description`, `location_id`, `active_flag`, `inactive_date`, `start_date`, `end_date`, `deleted_flag`, `industry_type`, `contact_person`, `mobile_number`, `email`, `user_name`, `password`, `organization_image`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, '1001', 'Tech Solutions', 'A leading provider of IT solutions and software development services.', 101, 'Y', NULL, '2024-01-01', '2025-12-31', 'N', 'Information Technology', 'John Doe', '+1234567890', 'contact@techsolutions.com', 'johndoe', 'SecurePass', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 1, '2023-05-18 12:34:29', 1, '2023-11-10 09:45:00'),
(2, '1041', 'AM Briyani', '', 1, 'Y', NULL, NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2024-06-26 12:33:29', 1, '2024-06-26 12:33:29'),
(3, NULL, 'Aideanex', NULL, 1, 'Y', NULL, NULL, NULL, 'N', NULL, 'Vetrivel', '6380394289', 'vetriveltechs@gmail.com', NULL, NULL, 'data:image/png;base64,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', NULL, NULL, NULL, NULL),
(4, NULL, 'Tech Solutions Inc.', 'A leading provider of IT solutions and software development services.', 101, 'Y', NULL, '2024-01-01', '2025-12-31', 'N', 'Information Technology', 'John Doe', '+1234567890', 'contact@techsolutions.com', 'johndoe', 'SecurePass', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `per_people_all`
--

CREATE TABLE `per_people_all` (
  `employee_id` int(11) NOT NULL,
  `employee_type` varchar(150) DEFAULT NULL,
  `employee_number` varchar(150) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
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

INSERT INTO `per_people_all` (`employee_id`, `employee_type`, `employee_number`, `organization_id`, `first_name`, `middle_name`, `last_name`, `mobile_number`, `alt_mobile_number`, `email`, `alt_email`, `father_name`, `mother_name`, `date_of_birth`, `gender`, `blood_group`, `department`, `department_id`, `designation_id`, `date_of_joining`, `date_of_relieving`, `previous_experience`, `rate_per_hour`, `rate_per_day`, `pay_frequency`, `aadhar_number`, `pan_number`, `driving_licence`, `passport_number`, `passport_issue_date`, `passport_expiry_date`, `pf_number`, `esi_number`, `uan_number`, `address_1`, `address_2`, `address_3`, `postal_code`, `account_number`, `account_holder_number`, `bank_name`, `branch_name`, `ifsc_code`, `micr_code`, `address`, `active_flag`, `create_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 'PERMANENT', '', 2, 'Manoj', 'Kumar', 'M', '7010016615', '9978269963', 'manoj@gmail.com', 'manojkumar@gmail.com', 'Murugesan', 'Selvarani', '0000-00-00', 'MALE', 1, '1', 1, 1, '2024-10-01', '2024-10-02', 2, '2000.00', '16000.00', 'WEEK', '123456789012', 'ABCD123', '', '', '0000-00-00', '0000-00-00', '', '', '', 'ATTUR', 'SALEM', 'Tamil Nadu', '636141', '123456789', 'Manoj Kumar', 'SBI', 'ATTUR', '1234567891', 'MKIU12345', 'Attur', 'Y', NULL, '2024-10-10 19:51:29', NULL, '2025-04-15 08:52:09'),
(3, 'PERMANENT', 'EMP-1000', 1, 'vetri', 'Vel', 'M', '6380394289', '9087334690', 'vetriveltechs@gmail.com', 'vetri@gmail.com', 'Murugesan', 'Selvarani', '1999-12-22', 'MALE', 1, NULL, 1, 1, '2000-01-01', '2000-01-04', 2, '1000.00', '8000.00', 'MONTH', '1234567891', 'A12345CD', 'TNSJDKSD52', '123456789', '2000-01-06', '2000-01-08', '789456123', '', '1478520369', 'Attur', 'Attur', 'Attur', '636141', '6363656566', 'Vetrivel', 'SBI', 'Attur', 'A12349089', 'J89098909', 'Attur', 'Y', NULL, '2025-01-26 17:11:52', NULL, '2025-04-15 08:52:14');

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
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `state_id` int(11) NOT NULL,
  `country_id` int(5) DEFAULT NULL,
  `state_name` varchar(50) DEFAULT NULL,
  `state_code` varchar(150) DEFAULT NULL,
  `state_number` varchar(150) DEFAULT NULL,
  `active_flag` varchar(1) NOT NULL DEFAULT 'Y',
  `inactive_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_by` int(11) DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`state_id`, `country_id`, `state_name`, `state_code`, `state_number`, `active_flag`, `inactive_date`, `created_by`, `created_date`, `last_updated_by`, `last_updated_date`) VALUES
(1, 1, 'Kerala', 'KL', '01', 'Y', NULL, NULL, NULL, NULL, NULL);

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
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

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
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `location_id` (`location_id`,`location_name`,`country_id`,`state_id`,`city_id`,`active_flag`,`inactive_date`,`start_date`,`end_date`,`deleted_flag`,`created_by`,`created_date`,`last_updated_by`,`last_updated_date`);

--
-- Indexes for table `lov`
--
ALTER TABLE `lov`
  ADD PRIMARY KEY (`lov_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`organization_id`);

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
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`state_id`);

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
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lov`
--
ALTER TABLE `lov`
  MODIFY `lov_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `organization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
