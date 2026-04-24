package academic_management_api.repository;

import academic_management_api.entity.Nota;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

// Acceso a datos para registrar y consultar notas.
public interface NotaRepository extends JpaRepository<Nota, Long> {

    List<Nota> findByAlumnoId(Long alumnoId);

    List<Nota> findByAlumnoIdAndMateriaId(Long alumnoId, Long materiaId);
}
