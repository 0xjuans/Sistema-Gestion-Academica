package academic_management_api.repository;

import academic_management_api.entity.Alumno;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// Acceso a datos para operaciones CRUD y validaciones de Alumno.
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    boolean existsByEmail(String email);

    Optional<Alumno> findByEmail(String email);
}
