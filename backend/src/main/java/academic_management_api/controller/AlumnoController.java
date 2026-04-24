package academic_management_api.controller;

import academic_management_api.dto.AlumnoRequestDto;
import academic_management_api.dto.AlumnoResponseDto;
import academic_management_api.service.AlumnoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Expone endpoints REST para la gestion de alumnos.
@RestController
@RequestMapping("/api/alumnos")
@Tag(name = "Alumnos", description = "Endpoints para gestionar alumnos del sistema academico")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @PostMapping
    @Operation(summary = "Crear alumno", description = "Registra un nuevo alumno con nombre, apellido, email y fecha de nacimiento")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Alumno creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada invalidos"),
            @ApiResponse(responseCode = "409", description = "El email ya esta registrado")
    })
    public ResponseEntity<AlumnoResponseDto> create(@Valid @RequestBody AlumnoRequestDto requestDto) {
        AlumnoResponseDto createdAlumno = alumnoService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAlumno);
    }

    @GetMapping
    @Operation(summary = "Listar alumnos", description = "Obtiene el listado completo de alumnos registrados")
    @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    public ResponseEntity<List<AlumnoResponseDto>> findAll() {
        return ResponseEntity.ok(alumnoService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar alumno por ID", description = "Obtiene el detalle de un alumno especifico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Alumno encontrado"),
            @ApiResponse(responseCode = "404", description = "No existe un alumno con ese ID")
    })
    public ResponseEntity<AlumnoResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(alumnoService.findById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar alumno", description = "Actualiza la informacion de un alumno existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Alumno actualizado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada invalidos"),
            @ApiResponse(responseCode = "404", description = "Alumno no encontrado"),
            @ApiResponse(responseCode = "409", description = "El email ya esta registrado")
    })
    public ResponseEntity<AlumnoResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody AlumnoRequestDto requestDto
    ) {
        return ResponseEntity.ok(alumnoService.update(id, requestDto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar alumno", description = "Elimina un alumno por su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Alumno eliminado correctamente"),
            @ApiResponse(responseCode = "404", description = "Alumno no encontrado")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alumnoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
