-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2026 at 04:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medihub`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `shopify_order_id` varchar(255) NOT NULL,
  `order_name` varchar(50) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `shopify_customer_id` varchar(64) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `total_ex_gst` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `subtotal` decimal(10,2) DEFAULT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `discounts` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`shopify_order_id`, `order_name`, `order_date`, `shopify_customer_id`, `customer_name`, `status`, `total_ex_gst`, `created_at`, `subtotal`, `tax`, `discounts`) VALUES
('gid://shopify/Order/6572268421209', '#1001', '2025-11-06 03:42:22', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572441075801', '#1002', '2025-11-06 05:12:14', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572446842969', '#1003', '2025-11-06 05:15:51', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572454707289', '#1004', '2025-11-06 05:19:01', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572457099353', '#1005', '2025-11-06 05:20:52', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572490752089', '#1006', '2025-11-06 05:34:47', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572494553177', '#1007', '2025-11-06 05:36:56', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572523880537', '#1008', '2025-11-06 05:54:38', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572525355097', '#1009', '2025-11-06 05:55:35', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572526501977', '#1010', '2025-11-06 05:56:16', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572528271449', '#1011', '2025-11-06 05:57:24', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572536365145', '#1012', '2025-11-06 06:02:06', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572538331225', '#1013', '2025-11-06 06:03:17', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572540756057', '#1014', '2025-11-06 06:04:44', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6572542591065', '#1015', '2025-11-06 06:05:44', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574824456281', '#1016', '2025-11-06 22:05:47', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574826881113', '#1017', '2025-11-06 22:06:54', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574828683353', '#1018', '2025-11-06 22:07:46', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574830288985', '#1019', '2025-11-06 22:08:26', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574832910425', '#1020', '2025-11-06 22:09:32', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574883176537', '#1022', '2025-11-06 22:38:40', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574883831897', '#1023', '2025-11-06 22:39:01', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574886551641', '#1024', '2025-11-06 22:40:15', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574895202393', '#1025', '2025-11-06 22:45:43', 'gid://shopify/Customer/8789193130073', 'Bob Huang', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6574930460761', '#1026', '2025-11-06 23:06:43', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574931443801', '#1027', '2025-11-06 23:07:24', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574932197465', '#1028', '2025-11-06 23:07:59', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574934949977', '#1029', '2025-11-06 23:09:55', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574937735257', '#1030', '2025-11-06 23:11:24', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574939406425', '#1031', '2025-11-06 23:12:31', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574940061785', '#1032', '2025-11-06 23:12:57', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574940618841', '#1033', '2025-11-06 23:13:21', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574941634649', '#1034', '2025-11-06 23:14:14', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574942683225', '#1035', '2025-11-06 23:14:53', 'gid://shopify/Customer/8791648993369', 'Bob Huang', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574944190553', '#1036', '2025-11-06 23:15:48', 'gid://shopify/Customer/8791663673433', 'Bob3 Huang3', 'PAID', 25.00, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574958903385', '#1037', '2025-11-06 23:25:27', 'gid://shopify/Customer/8791663673433', 'Bob3 Huang3', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574965915737', '#1038', '2025-11-06 23:30:21', 'gid://shopify/Customer/8791663673433', 'Bob3 Huang3', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574992883801', '#1039', '2025-11-06 23:48:27', 'gid://shopify/Customer/8791663673433', 'Bob3 Huang3', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6574998487129', '#1040', '2025-11-06 23:52:07', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575000453209', '#1041', '2025-11-06 23:53:25', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575004516441', '#1042', '2025-11-06 23:56:22', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575007367257', '#1043', '2025-11-06 23:58:41', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575008645209', '#1044', '2025-11-06 23:59:31', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575012511833', '#1045', '2025-11-07 00:02:15', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575021064281', '#1046', '2025-11-07 00:07:46', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575023259737', '#1047', '2025-11-07 00:09:08', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575029452889', '#1048', '2025-11-07 00:12:51', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575031091289', '#1049', '2025-11-07 00:13:57', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575033057369', '#1050', '2025-11-07 00:15:16', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575036891225', '#1051', '2025-11-07 00:17:42', 'gid://shopify/Customer/8791721410649', 'Bob4 Huang4', 'PAID', 24.95, '2026-01-21 01:21:04', 20.00, 0.00, 0.00),
('gid://shopify/Order/6575368241241', '#1052', '2025-11-07 03:57:32', 'gid://shopify/Customer/8792089002073', 'Bob4 Huang4', 'PAID', 44.95, '2026-01-21 01:21:04', 40.00, 0.00, 0.00),
('gid://shopify/Order/6575533228121', '#1058', '2025-11-07 06:39:16', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 10.00, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6575534243929', '#1059', '2025-11-07 06:40:19', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 14.95, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6580562165849', '#1064', '2025-11-09 22:18:23', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 14.95, '2026-01-21 01:21:04', 10.00, 0.00, 0.00),
('gid://shopify/Order/6619534098521', '#1101', '2025-11-25 04:48:08', 'gid://shopify/Customer/8859900149849', 'l m', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6619568013401', '#1102', '2025-11-25 05:09:23', 'gid://shopify/Customer/8859900149849', 'l m', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6619573518425', '#1103', '2025-11-25 05:12:56', 'gid://shopify/Customer/8859900149849', 'l m', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6619579809881', '#1104', '2025-11-25 05:16:53', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6621710876761', '#1106', '2025-11-26 00:52:42', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6621725786201', '#1107', '2025-11-26 01:01:36', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6621731455065', '#1108', '2025-11-26 01:04:44', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6621850730585', '#1109', '2025-11-26 02:14:27', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6621884481625', '#1110', '2025-11-26 02:34:06', 'gid://shopify/Customer/8788680736857', 'Seven Hills Seven Hills', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622021189721', '#1111', '2025-11-26 04:00:02', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622026793049', '#1112', '2025-11-26 04:03:13', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622031347801', '#1113', '2025-11-26 04:06:32', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622049009753', '#1114', '2025-11-26 04:18:53', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622095802457', '#1115', '2025-11-26 04:52:10', 'gid://shopify/Customer/8788680736857', 'Seven Hills Seven Hills', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622131355737', '#1117', '2025-11-26 05:17:34', 'gid://shopify/Customer/8788680736857', 'Seven Hills Seven Hills', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622163239001', '#1118', '2025-11-26 05:33:44', 'gid://shopify/Customer/8788680736857', 'Seven Hills Seven Hills', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622163337305', '#1119', '2025-11-26 05:33:49', 'gid://shopify/Customer/8788680736857', 'Seven Hills Seven Hills', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6622211473497', '#1120', '2025-11-26 06:15:09', 'gid://shopify/Customer/8788680736857', 'Seven Hills Seven Hills', 'PAID', 5.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6624577912921', '#1126', '2025-11-27 02:33:51', 'gid://shopify/Customer/8859900149849', 'l m', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6630665781337', '#1130', '2025-11-28 02:25:00', 'gid://shopify/Customer/8788681588825', 'Vivian Lin', 'PAID', 1.00, '2026-01-21 01:21:04', 1.00, 0.00, 0.00),
('gid://shopify/Order/6700060278873', '#1135', '2025-12-08 00:46:14', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6700063522905', '#1136', '2025-12-08 00:47:45', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6700069421145', '#1137', '2025-12-08 00:50:24', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6700352503897', '#1138', '2025-12-08 03:04:47', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6700401688665', '#1152', '2025-12-08 03:28:50', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6700404342873', '#1154', '2025-12-08 03:30:07', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6700726779993', '#1160', '2025-12-08 06:55:00', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6707263078489', '#1171', '2025-12-08 23:21:07', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6707264880729', '#1172', '2025-12-08 23:21:52', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00),
('gid://shopify/Order/6707298959449', '#1181', '2025-12-08 23:36:26', 'gid://shopify/Customer/8788741554265', 'Bob4 Huang4', 'PAID', 1499.00, '2026-01-21 01:21:04', 1499.00, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_id`, `title`, `quantity`, `price`) VALUES
('gid://shopify/Order/6707298959449', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6707264880729', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6707263078489', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700726779993', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700404342873', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700401688665', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700352503897', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700069421145', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700063522905', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6700060278873', 'PacerLite Foldable Mobility Scooter', 1, 1499.00),
('gid://shopify/Order/6630665781337', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6624577912921', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622211473497', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622163337305', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622163239001', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622131355737', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622095802457', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622049009753', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622031347801', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622026793049', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6622021189721', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6621884481625', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6621850730585', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6621731455065', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6621725786201', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6621710876761', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6619579809881', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6619573518425', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6619568013401', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6619534098521', 'bob\'s ebike', 1, 1.00),
('gid://shopify/Order/6580562165849', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6575534243929', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6575533228121', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6575368241241', 'bob hidden ebike', 2, 20.00),
('gid://shopify/Order/6575036891225', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575033057369', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575031091289', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575029452889', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575023259737', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575021064281', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575012511833', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575008645209', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575007367257', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575004516441', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6575000453209', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574998487129', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574992883801', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574965915737', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574958903385', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574944190553', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574942683225', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574941634649', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574940618841', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574940061785', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574939406425', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574937735257', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574934949977', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574932197465', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574931443801', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574930460761', 'bob\'s ebike', 2, 10.00),
('gid://shopify/Order/6574895202393', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574886551641', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574883831897', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574883176537', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574832910425', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574830288985', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574828683353', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574826881113', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6574824456281', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572542591065', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572540756057', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572538331225', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572536365145', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572528271449', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572526501977', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572525355097', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572523880537', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572494553177', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572490752089', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572457099353', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572454707289', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572446842969', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572441075801', 'bob\'s ebike', 1, 10.00),
('gid://shopify/Order/6572268421209', 'bob\'s ebike', 1, 10.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`shopify_order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD KEY `fk_order_items_orders` (`order_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`shopify_order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
