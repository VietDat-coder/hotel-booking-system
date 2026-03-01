INSERT INTO users (name, email, password, phone, role, created_at)
VALUES
('Admin', 'admin@example.com', '$2a$10$Zc0YV8Zp0xTQx3iMuquM3uQmAkvG8i1e6zMDFMvx6bMpiKFFitK2m', '0123456789', 'ADMIN', NOW()),
('John Doe', 'john@example.com', '$2a$10$Zc0YV8Zp0xTQx3iMuquM3uQmAkvG8i1e6zMDFMvx6bMpiKFFitK2m', '0987654321', 'USER', NOW());
-- password for both users is "password"

INSERT INTO hotels (name, city, address, description, rating, thumbnail)
VALUES
('Sunrise Hotel', 'Hanoi', '123 Street, Hanoi', 'Modern hotel in Hanoi', 4.5, 'https://example.com/hotel1.jpg'),
('Beach Resort', 'Da Nang', '456 Beach Road, Da Nang', 'Resort near the beach', 4.7, 'https://example.com/hotel2.jpg');

INSERT INTO rooms (hotel_id, room_type, price, capacity, quantity, description)
VALUES
(1, 'Standard', 50.0, 2, 10, 'Standard room'),
(1, 'Deluxe', 80.0, 3, 5, 'Deluxe room'),
(2, 'Sea View', 120.0, 2, 8, 'Sea view room'),
(2, 'Family', 150.0, 4, 4, 'Family room');

INSERT INTO room_images (room_id, image_url)
VALUES
(1, 'https://example.com/room1-1.jpg'),
(1, 'https://example.com/room1-2.jpg'),
(2, 'https://example.com/room2-1.jpg'),
(3, 'https://example.com/room3-1.jpg'),
(4, 'https://example.com/room4-1.jpg');

INSERT INTO bookings (user_id, total_price, status, created_at)
VALUES
(2, 100.0, 'PAID', NOW());

INSERT INTO booking_details (booking_id, room_id, check_in, check_out, price)
VALUES
(1, 1, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_SUB(CURDATE(), INTERVAL 3 DAY), 100.0);

INSERT INTO payments (booking_id, method, status, transaction_code)
VALUES
(1, 'CREDIT_CARD', 'PAID', 'TX-123456789');

INSERT INTO reviews (user_id, hotel_id, rating, comment, created_at)
VALUES
(2, 1, 5, 'Great hotel!', NOW()),
(2, 2, 4, 'Nice resort.', NOW());

