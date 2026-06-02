package com.merra.careerpilot.controller;

import com.merra.careerpilot.model.JobApplication;
import com.merra.careerpilot.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class JobApplicationController {
    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<JobApplication> getApplications() {
        return service.findAll();
    }

    @PostMapping
    public JobApplication createApplication(@Valid @RequestBody JobApplication jobApplication) {
        return service.create(jobApplication);
    }

    @PutMapping("/{id}")
    public JobApplication updateApplication(@PathVariable Long id, @Valid @RequestBody JobApplication jobApplication) {
        return service.update(id, jobApplication);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        service.delete(id);
    }
}
