package br.com.rafaelvieira.restarchetypebook_v2.exceptions;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

public record ExceptionResponse(Date timestamp, String message, String details) implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

}
// Versão depreciada:
//public class ExceptionResponse implements Serializable {
//
//    @Serial
//    private static final long serialVersionUID = 1L;
//
//    private final Date timestamp;
//    private final String message;
//    private final String details;
//
//    public ExceptionResponse(Date timestamp, String message, String details) {
//        this.timestamp = timestamp;
//        this.message = message;
//        this.details = details;
//    }
//
//    public Date getTimestamp() {
//        return timestamp;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public String getDetails() {
//        return details;
//    }
//}
