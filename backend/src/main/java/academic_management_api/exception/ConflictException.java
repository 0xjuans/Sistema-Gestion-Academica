package academic_management_api.exception;

// Se lanza cuando una operacion viola una regla de unicidad.
public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }
}
