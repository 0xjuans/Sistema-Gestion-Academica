package academic_management_api.controller;

import academic_management_api.dto.NotaCreateRequestDto;
import academic_management_api.dto.NotaResponseDto;
import academic_management_api.service.NotaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Notas", description = "Endpoints para registrar y consultar calificaciones")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    @Operation(summary = "Registrar nota", description = "Registra una nota para un alumno en una materia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Nota registrada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada invalidos"),
            @ApiResponse(responseCode = "404", description = "Alumno o materia no encontrados")
    })
    public ResponseEntity<NotaResponseDto> create(@Valid @RequestBody NotaCreateRequestDto requestDto) {
        NotaResponseDto createdNota = notaService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNota);
    }

    @GetMapping("/alumno/{alumnoId}")
    @Operation(summary = "Listar notas por alumno", description = "Obtiene todas las notas registradas para un alumno")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Consulta realizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Alumno no encontrado")
    })
    public ResponseEntity<List<NotaResponseDto>> findByAlumno(@PathVariable Long alumnoId) {
        return ResponseEntity.ok(notaService.findByAlumno(alumnoId));
    }

    @GetMapping("/alumno/{alumnoId}/materia/{materiaId}")
    @Operation(summary = "Listar notas por alumno y materia", description = "Obtiene las notas de un alumno filtradas por materia")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Consulta realizada correctamente"),
            @ApiResponse(responseCode = "404", description = "Alumno o materia no encontrados")
    })
    public ResponseEntity<List<NotaResponseDto>> findByAlumnoAndMateria(
            @PathVariable Long alumnoId,
            @PathVariable Long materiaId
    ) {
        return ResponseEntity.ok(notaService.findByAlumnoAndMateria(alumnoId, materiaId));
    }
}
