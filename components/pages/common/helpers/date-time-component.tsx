'use client';
import React from 'react';

function formatDate(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

interface DateTimeProps {
  dateTimeString: string;
}

function DateTimeComponent({ dateTimeString }: DateTimeProps) {
  const formattedDate = formatDate(dateTimeString);

  return (
    <div>
      {formattedDate}
    </div>
  );
}

export default DateTimeComponent;