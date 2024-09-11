use enote;

select * from roles;

CREATE TABLE per_user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(50),
    user_name VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    start_date DATE,
    end_date DATE,
    active_flag CHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_name VARCHAR(100),
    role_status CHAR(1),
    active_flag CHAR(1) DEFAULT 'Y',
    create_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_by VARCHAR(100),
    last_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES per_user(user_id)
);
