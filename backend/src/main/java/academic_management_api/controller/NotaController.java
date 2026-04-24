package academic_management_api.controller;

import academic_management_api.dto.NotaCreateRequestDto;
import academic_management_api.dto.NotaResponseDto;
import academic_management_api.service.NotaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Expone endpoints REST para registrar y consultar notas.
@RestController
@RequestMapping("/api/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    public ResponseEntity<NotaResponseDto> create(@Valid @RequestBody NotaCreateRequestDto requestDto) {
        NotaResponseDto createdNota = notaService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNota);
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<NotaResponseDto>> findByAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(notaService.findByAlumno(alumnoId));
    }

    @GetMapping("/alumno/{alumnoId}/materia/{materiaId}")
    public ResponseEntity<List<NotaResponseDto>> findByAlumnoAndMateria(
            @PathVariable Long alumnoId,
            @PathVariable Long materiaId
    ) {
        return ResponseEntity.ok(notaService.findByAlumnoAndMateria(alumnoId, materiaId));
    }
}
