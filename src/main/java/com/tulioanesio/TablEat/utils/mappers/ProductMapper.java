package com.tulioanesio.TablEat.utils.mappers;

import com.tulioanesio.TablEat.dtos.ProductRequestDTO;
import com.tulioanesio.TablEat.dtos.ProductResponseDTO;
import com.tulioanesio.TablEat.models.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        Product product = new Product();
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setCategory(dto.category());

        return product;
    }

    public ProductResponseDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }

        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getAvailable(),
                product.getCategory(),
                product.getImageUrl()
        );
    }

    public void updateEntityFromDto(ProductRequestDTO dto, Product entity) {
        entity.setName(dto.name());
        entity.setDescription(dto.description());
        entity.setPrice(dto.price());
    }
}