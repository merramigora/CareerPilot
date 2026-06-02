package com.merra.careerpilot.service;

import com.merra.careerpilot.model.JobApplication;
import com.merra.careerpilot.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobApplicationService {
    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public List<JobApplication> findAll() {
        return repository.findAll();
    }

    public JobApplication create(JobApplication jobApplication) {
        return repository.save(jobApplication);
    }

    public JobApplication update(Long id, JobApplication updatedApplication) {
        JobApplication existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        existing.setCompany(updatedApplication.getCompany());
        existing.setRole(updatedApplication.getRole());
        existing.setLocation(updatedApplication.getLocation());
        existing.setStatus(updatedApplication.getStatus());
        existing.setDateApplied(updatedApplication.getDateApplied());
        existing.setNotes(updatedApplication.getNotes());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
