create database enote;
use enote;

select * from roles;

CREATE TABLE per_user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(50),
    user_name VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    start_date DATE,
    end_date DATE,
    active_flag VARCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;

CREATE TABLE per_user_roles (
    user_role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    user_id INT,
    role_name VARCHAR(100),
    role_status VARCHAR(1),
    active_flag varchar(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;


CREATE TABLE lov (
    lov_id INT AUTO_INCREMENT PRIMARY KEY,
    list_name varchar(150),
    list_description text,
    from_date date,
    to_date date,
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;

CREATE TABLE list_type_values (
    list_type_values_id INT AUTO_INCREMENT PRIMARY KEY,
    lov_id int(11),
    list_code varchar(150),
    list_value varchar(150),
    order_sequence int(11),
    short_description varchar(150),
    start_date date,
    end_date date,
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name varchar(150),
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;

CREATE TABLE per_people_all (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_type VARCHAR(150),
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    mobile_number VARCHAR(15),
    alt_mobile_number VARCHAR(15),
    email VARCHAR(100),
    alt_email VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(10),
    blood_group VARCHAR(5),
    department VARCHAR(100),
    date_of_joining DATE,
    date_of_relieving DATE,
    previous_experience INT,
    rate_per_hour DECIMAL(10, 2),
    rate_per_day DECIMAL(10, 2),
    pay_frequency VARCHAR(50),
    aadhar_number VARCHAR(20),
    pan_number VARCHAR(20),
    driving_licence VARCHAR(20),
    passport_number VARCHAR(20),
    passport_issue_date DATE,
    passport_expiry_date DATE,
    pf_number VARCHAR(20),
    esi_number VARCHAR(20),
    uan_number VARCHAR(20),
    address_1 VARCHAR(255),
    address_2 VARCHAR(255),
    address_3 VARCHAR(255),
    postal_code VARCHAR(10),
    account_number VARCHAR(20),
    account_holder_number VARCHAR(100),
    bank_name VARCHAR(100),
    branch_name VARCHAR(100),
    ifsc_code VARCHAR(20),
    micr_code VARCHAR(20),
    address TEXT,
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;


CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(100),
    role_description text,
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100),
    password text,
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;

CREATE TABLE blood_group (
    blood_group_id INT PRIMARY KEY AUTO_INCREMENT,
    blood_group_name VARCHAR(100),
    active_flag varCHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) auto_increment=1;