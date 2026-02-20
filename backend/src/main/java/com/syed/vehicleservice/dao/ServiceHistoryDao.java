package com.syed.vehicleservice.dao;

import java.util.List;
import com.syed.vehicleservice.entity.ServiceHistory;

public interface ServiceHistoryDao {

    void addHistory(ServiceHistory history);

    List<ServiceHistory> getAllHistory();

    List<ServiceHistory> getHistoryByUserId(int userId);
}
