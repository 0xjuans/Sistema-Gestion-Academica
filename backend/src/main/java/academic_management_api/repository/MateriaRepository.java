package academic_management_api.repository;

import academic_management_api.entity.Materia;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// Acceso a datos para operaciones CRUD y validaciones de Materia.
public interface MateriaRepository extends JpaRepository<Materia, Long> {

    boolean existsByCodigo(String codigo);

    Optional<Materia> findByCodigo(String codigo);
}
