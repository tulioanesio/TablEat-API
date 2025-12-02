package com.tulioanesio.TablEat.dtos;

import java.math.BigDecimal;

public record ProductRequestDTO(
        String name,
        String description,
        BigDecimal price,
        Boolean available,
        String category,
        String imageUrl
) {
}
