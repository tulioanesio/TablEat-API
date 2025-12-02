package com.tulioanesio.TablEat.services;

import com.tulioanesio.TablEat.dtos.ProductRequestDTO;
import com.tulioanesio.TablEat.dtos.ProductResponseDTO;
import com.tulioanesio.TablEat.models.Product;
import com.tulioanesio.TablEat.repositories.ProductRepository;
import com.tulioanesio.TablEat.utils.mappers.ProductMapper;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public Page<ProductResponseDTO> findAll(String name, Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(productMapper::toDTO);
    }

    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        return productMapper.toDTO(product);
    }

    @Transactional
    public ProductResponseDTO create(ProductRequestDTO productRequestDTO) {
        Product productToSave = productMapper.toEntity(productRequestDTO);

        Product savedProduct = productRepository.save(productToSave);

        return productMapper.toDTO(savedProduct);
    }

    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO productRequestDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        productMapper.updateEntityFromDto(productRequestDTO, existingProduct);

        Product updatedProduct = productRepository.save(existingProduct);

        return productMapper.toDTO(updatedProduct);
    }

    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado");
        }
        productRepository.deleteById(id);
    }
}