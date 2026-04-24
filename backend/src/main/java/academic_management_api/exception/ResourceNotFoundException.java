package academic_management_api.exception;

// Se lanza cuando no existe un recurso solicitado.
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
