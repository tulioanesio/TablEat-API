package com.tulioanesio.TablEat.repositories;

import com.tulioanesio.TablEat.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
