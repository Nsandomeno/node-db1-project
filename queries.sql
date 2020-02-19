-- Database Queries

-- Find all customers with postal code 1010
    select postalCode from customers where postalCode = 1010;
-- Find the phone number for the supplier with the id 11
    select Phone from Suppliers where SupplierID = 11;
-- List first 10 orders placed, sorted descending by the order date
    select * from
        (
        select * from orders
        order by orderID limit 10
        )
    order by OrderDate desc;
-- Find all customers that live in London, Madrid, or Brazil
    select City 
    from Customers
    where City = 'London' OR 'Madrid' OR Country = 'Brazil';
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
    insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
    values ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth');
-- Update Bilbo Baggins record so that the postal code changes to "11122"
    update customers 
    set PostalCode = '11122'
    where CustomerName = 'The Shire';
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
    select count (distinct City) from customers;
-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
    select * from suppliers where length(SupplierName) > 20;