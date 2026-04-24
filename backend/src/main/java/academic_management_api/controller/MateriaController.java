package academic_management_api.controller;

import academic_management_api.dto.MateriaRequestDto;
import academic_management_api.dto.MateriaResponseDto;
import academic_management_api.service.MateriaService;
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

// Expone endpoints REST para la gestion de materias.
@RestController
@RequestMapping("/api/materias")
@Tag(name = "Materias", description = "Endpoints para gestionar materias o asignaturas")
public class MateriaController {

    private final MateriaService materiaService;

    public MateriaController(MateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @PostMapping
    @Operation(summary = "Crear materia", description = "Registra una nueva materia con nombre, codigo y creditos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Materia creada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada invalidos"),
            @ApiResponse(responseCode = "409", description = "El codigo ya esta registrado")
    })
    public ResponseEntity<MateriaResponseDto> create(@Valid @RequestBody MateriaRequestDto requestDto) {
        MateriaResponseDto createdMateria = materiaService.create(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMateria);
    }

    @GetMapping
    @Operation(summary = "Listar materias", description = "Obtiene el listado completo de materias registradas")
    @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente")
    public ResponseEntity<List<MateriaResponseDto>> findAll() {
        return ResponseEntity.ok(materiaService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar materia por ID", description = "Obtiene el detalle de una materia especifica")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Materia encontrada"),
            @ApiResponse(responseCode = "404", description = "No existe una materia con ese ID")
    })
    public ResponseEntity<MateriaResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(materiaService.findById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar materia", description = "Actualiza la informacion de una materia existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Materia actualizada correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada invalidos"),
            @ApiResponse(responseCode = "404", description = "Materia no encontrada"),
            @ApiResponse(responseCode = "409", description = "El codigo ya esta registrado")
    })
    public ResponseEntity<MateriaResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody MateriaRequestDto requestDto
    ) {
        return ResponseEntity.ok(materiaService.update(id, requestDto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar materia", description = "Elimina una materia por su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Materia eliminada correctamente"),
            @ApiResponse(responseCode = "404", description = "Materia no encontrada")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        materiaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
